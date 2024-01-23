import React from "react";
import  './Register.css';

const Register = () =>{
    return(
        <>
        <div className="registerbox">
            <div className="registerbody">
                <h1>Login</h1>
                <form>
                    <div className="inputdiv">
                        <div>
                            <span class="material-symbols-outlined">mail</span>
                        </div>
                        <input type="email"  placeholder="email"/>
                    </div>
                    <div className="inputdiv">
                        <div>
                            <span class="material-symbols-outlined">password</span>
                        </div>
                        <input type="password"  placeholder="password"/>
                    </div>
                    <button type="submit" className="loginbtn">Login</button>
                    <button type="button" className="signupbtn">Signup</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register;