import React from "react";
import  './Register.css';
import { useState } from "react";
import axios from "axios";
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/Authorization";
const Register = () =>{
    const backendurl = process.env.REACT_APP_BACKEND_BASE_URL;
    const [authToken, setauthToken] = useAuth();
    // console.log(authToken);
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [confirmpassword , setconfirmpassword] = useState("");
    const [name,setname] = useState("");
    const handleLogin = async (e)=>{
        e.preventDefault();
        const loginData = {
            email : email,
            password : password,
        };
        console.log(loginData);
        await axios.post(`${backendurl}/signin/`,loginData)
        .then((response)=>{
            if (response.status === 200){
                const data = response.data;
                console.log("login sucessfull",data);
                localStorage.setItem("authToken",data.token);
                localStorage.setItem("useremail",data.user.email);
                setauthToken(data.token);
                toast.success("Login Successfull");
            }
            else{
                console.log("login failed");
                toast.error(`${response.data.message}`);
            }
        })
        .catch((e)=>{
            console.error(e);
            toast.error(e.response.data.message);
        })
    }
    const handleSignup = async (e)=>{
        e.preventDefault();
        if (password===confirmpassword){
            const signupData = {
                email: email,
                password : password,
                name : name,
            };
            console.log(signupData);
            await axios.post(`${backendurl}/signup`,signupData)
            .then((response)=>{
                if (response.status === 200){
                    console.log("signup successfull");
                    toast.success("Signup Successfull");
                }
                else{
                    toast.error(response.data.message);
                }
            })
            .catch((e)=>{
                console.log("signup failed");
                console.error(e);
                toast.error(e.response.data.message);
            })
        }
        else{
            toast.info("password and confirm password must be same");
        }
    }
    const switchtoSignup = ()=>{
        document.getElementById("loginbody").style.display = 'none';
        document.getElementById('signupbody').style.display = 'flex';
    }
    const switchtoLogin = ()=>{
        document.getElementById("loginbody").style.display = 'flex';
        document.getElementById('signupbody').style.display = 'none';
    }
    return(
        <>
        <div className="registerbox">
            {/* <ToastContainer /> */}
            <div className="registerbody" id="loginbody">
                <h1>Login</h1>
                <form onSubmit={handleLogin} >
                    <div className="inputdiv">
                        <div>
                            <span class="material-symbols-outlined">mail</span>
                        </div>
                        <input type="email"  placeholder="email" required onChange={(e)=>setemail(e.target.value)}/>
                    </div>
                    <div className="inputdiv">
                        <div>
                            <span class="material-symbols-outlined">password</span>
                        </div>
                        <input type="password"  placeholder="password" required onChange={(e)=>setpassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="loginbtn">Login</button>
                    <button type="button" className="signupbtn" onClick={switchtoSignup}>Signup</button>
                </form>
            </div>
            <div className="registerbody" id="signupbody" style={{display:"none",height:"auto"}} >
                <h1 style={{marginBottom:"10px"}}>Signup</h1>
                <form onSubmit={handleSignup} >
                    <div className="inputdiv">
                        <div>
                            <span class="material-symbols-outlined">mail</span>
                        </div>
                        <input type="email"  placeholder="email" required onChange={(e)=>setemail(e.target.value)}/>
                    </div>
                    <div className="inputdiv">
                        <div>
                            <span class="material-symbols-outlined">badge</span>
                        </div>
                        <input type="text"  placeholder="name" required onChange={(e)=>setname(e.target.value)}/>
                    </div>
                    <div className="inputdiv">
                        <div>
                            <span class="material-symbols-outlined">password</span>
                        </div>
                        <input type="password"  placeholder="password" required onChange={(e)=>setpassword(e.target.value)}/>
                    </div>
                    <div className="inputdiv">
                        <div>
                            <span class="material-symbols-outlined">password</span>
                        </div>
                        <input type="password"  placeholder="confirm password" required onChange={(e)=>setconfirmpassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="loginbtn">Signup</button>
                    <button type="button" className="signupbtn" onClick={switchtoLogin}>Login</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register;