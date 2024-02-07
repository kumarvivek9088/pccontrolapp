import React from "react";
import './Home.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import io, { connect } from 'socket.io-client';
// import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import { useAuth } from "../context/Authorization";
import { db } from "./Db";
const Home = ()=>{
    const backendurl = process.env.REACT_APP_BACKEND_BASE_URL;
    const useremail = 'vivek@gmail.com';
    // console.log("backend url",backendurl);
    const [userRooms,setuserRooms] = useState([]);
    const [chatHistory,setchatHistory] = useState([]);
    const [socket,setSocket] = useState(null);
    const [roomId,setroomId] = useState("");
    // const navigate = useNavigate();
    const [authToken,setauthToken] = useAuth();
    async function getchathistory(roomid){
        return await db.chathistory.where('room').equals(roomid).toArray();
    }
    // const authtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NWE2YzU2YzNmZGI2MmQwOTEyZTBlODciLCJlbWFpbCI6InZpdmVrQGdtYWlsLmNvbSIsIm5hbWUiOiJ2aXZlayIsImlhdCI6MTcwNjM2NjExOSwiZXhwIjoxNzA2NDUyNTE5fQ._SeIW9LyCtVzGQBaWrXC3e5ExTLQQDItBijat5IT6vQ'
    useEffect(()=>{
        console.log("I'm in the  userroom api useeffect");
        axios.get(`${backendurl}/userrooms/`,{
            headers:{
                Authorization: `Bearer ${authToken}`,
                "Content-Type":"application/json",
            },
        }).then((res)=> {
            console.log(res.data.result);
            setuserRooms(res.data.result);
            if (res.data.result.length >0){
                document.getElementsByClassName("createroom")[0].style.display = 'none';
            }
        })
        .catch((err)=>console.error(err));
        const socketInstance = io(backendurl);
        setSocket(socketInstance);
        return ()=>{
            socketInstance.disconnect();
        }
    },[backendurl]);
    const enablechatdiv = async (botname,roomid)=>{
        console.log("final socket",socket);
        console.log("chatmenu clicked")
        console.log(!document.getElementsByClassName("botchatbox")[0].style.display);
        let chatmenuboxdiv = document.getElementsByClassName("menu")[0];
        let homecontainerdiv = document.getElementsByClassName("homecontainer")[0];
        console.log(chatmenuboxdiv.offsetWidth ,homecontainerdiv.offsetWidth)
        if(document.getElementsByClassName("botchatbox")[0].style.display === 'none' || !document.getElementsByClassName("botchatbox")[0].style.display){
            if (roomId === roomid){
                document.getElementsByClassName("botchatbox")[0].style.display='none';
                setchatHistory([]);
                setroomId(null);
                socket.emit('leave',roomid);
            }else{
                document.getElementById("chatheaderbotnamepid").innerHTML = botname;
                // let localhistory = JSON.parse(localStorage.getItem(`roomid_${roomid}`));
                let localhistory = await getchathistory(roomid);
                console.log("localhistory",localhistory);
                if (localhistory.length === 0){
                    setchatHistory([]);
                }else{
                    setchatHistory(localhistory);
                }
                console.log("this is room",roomid);
                setroomId(roomid);
                console.log("roomid",roomId);
                if( roomid !== null){
                    socket.emit('join_room',{username :useremail,room : roomid});
                }
                if (chatmenuboxdiv.offsetWidth === homecontainerdiv.offsetWidth){
                    document.getElementsByClassName("botchatbox")[0].style.display='flex';
                    document.getElementsByClassName("menu")[0].style.display = 'none';
                    document.getElementsByClassName("overlaybox")[0].style.display = 'none';
                }else{
                    document.getElementsByClassName("botchatbox")[0].style.display='flex';
                }
            }
        }
        else{
            if (roomId==roomid){
                document.getElementsByClassName("botchatbox")[0].style.display='none';
                setchatHistory([]);
                setroomId(null);
                socket.emit('leave',roomid);
            }
            else{
                document.getElementById("chatheaderbotnamepid").innerHTML = botname;
                // let localhistory = JSON.parse(localStorage.getItem(`roomid_${roomid}`));
                // console.log("localhistory",localhistory);
                // if (localhistory === null){
                //     setchatHistory([]);
                // }else{
                //     setchatHistory(localhistory);
                // }
                let localhistory = await getchathistory(roomid);
                console.log("localhistory",localhistory);
                if (localhistory.length === 0){
                    setchatHistory([]);
                }else{
                    setchatHistory(localhistory);
                }
                console.log("this is room",roomid);
                setroomId(roomid);
                console.log("roomid",roomId);
                if( roomid !== null){
                    socket.emit('join_room',{username :useremail,room : roomid});
                }
                if (chatmenuboxdiv.offsetWidth === homecontainerdiv.offsetWidth){
                    document.getElementsByClassName("botchatbox")[0].style.display='flex';
                    document.getElementsByClassName("menu")[0].style.display = 'none';
                    document.getElementsByClassName("overlaybox")[0].style.display = 'none';
                }else{
                    document.getElementsByClassName("botchatbox")[0].style.display='flex';
                }
            }
        }
    }
    // useEffect(()=>{
    //     console.log("room id updated",roomId);
    // },[roomId])
    const back = ()=>{
        document.getElementsByClassName("botchatbox")[0].style.display = 'none';
        document.getElementsByClassName("menu")[0].style.display = 'flex';
        document.getElementsByClassName("overlaybox")[0].style.display = 'flex';
        console.log(roomId);
        setroomId(null);
        socket.emit('leave',roomId);
    }
    const triggerdotmenu = ()=>{
        let d = document.getElementsByClassName('dotmenucontainer')[0];
        if (d.style.display === 'none'){
            d.style.display = 'block';
        }
        else{
            d.style.display='none';
        }
    }
    const cancelcreateroom = ()=>{
        document.getElementsByClassName("createroom")[0].style.display = 'none';
        phoneassistantmenu();
    }
    const createnewroom = ()=>{
        document.getElementsByClassName("createroom")[0].style.display = 'flex';
        phoneassistantmenu();
    }
    const phoneassistantmenu = ()=>{
        let d = document.getElementsByClassName("overlaymenu")[0];
        if (d.style.display==='none' || !d.style.display){
            d.style.display = 'block';
        }
        else{
            d.style.display = 'none';
        }
    }
    const assistantmenu = ()=>{
        let d = document.getElementsByClassName('actionsmenu')[0];
        if (d.style.display==='none' || !d.style.display){
            d.style.display = 'flex';
        }
        else{
            d.style.display = 'none';
        }
    }
    const cancelbigscreencreateroom= ()=>{
        document.getElementsByClassName("createroom")[0].style.display = 'none';
        assistantmenu();
    }
    const sendMessage = ()=>{
        let message = document.getElementById("sendmessageinput").value;
        if (socket!==null && message.trim() !== ''){
            let d = new Date();
            socket.emit('send_message',{sender:useremail,room:roomId,message : message,type:"text",sent_at:d});
            document.getElementById("sendmessageinput").value = '';
        }
    }
    const creatnewroombutton = ()=>{
        let message = document.getElementById("createnewroomnameinput").value;
        if(message.trim() !== ''){
            axios.post(`${backendurl}/createroom`,
                {
                    name : message
                },
                {headers:{
                    Authorization : `Bearer ${authToken}`,
                    "Content-Type" : "Application/json",
                }}
            )
            .then((response)=>{
                if (response.status === 200){
                    toast.success("Room created Successfull");
                    setuserRooms(prevuserRooms=>[...prevuserRooms,response.data.result]);
                }
                else{
                    toast.error(response.data.message)
                }
            })
            .catch((e)=>{
                toast.error(e);
            })
        }
    }
    async function addchathistory(sender,room,message,type,sent_at) {
        try{
            await db.chathistory.add({
                sender,
                room,
                message,
                type,
                sent_at
            });
        } catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        
        // if (roomId !== null){
        //     console.log("roomid is in joining room",roomId);
        //     socket.emit('join_room',{username :useremail,room : "abc"});
        if (socket!==null){
            console.log("im in receiving message useeffect",roomId);
            socket.on('receive_message',(data)=>{
                console.log("received message",data);
                setchatHistory(prevchatHistory=>[...prevchatHistory,data]);
                addchathistory(data.sender,data.room,data.message,data.type,data.sent_at);
                console.log(chatHistory);
            })
            return ()=> socket.off("receive_message");
            
        }
        // }
    },[socket,roomId]);
    useEffect(()=>{
        if (chatHistory.length > 0){
            localStorage.setItem(`roomid_${roomId}`,JSON.stringify(chatHistory.at(-1)));
            // let ltch = chatHistory.at(-1);
            // addchathistory(ltch.sender,ltch.room,ltch.message,ltch.type,ltch.sent_at);
        }
    },[chatHistory]);
    const logout = ()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("useremail");
        toast.success("logout successfull");
        setauthToken(null);
        // navigate('/login');
    }
    const copyroomid = ()=>{
        console.log("room id in copy function",roomId);
        try{
            navigator.clipboard.writeText(roomId);
            toast.info("Room id copied to clipboard");
        }
        catch(e){
            console.log(e);
            let d = document.getElementById("sendmessageinput");
            d.value = roomId;
            toast.info("Check message input 🙃");
        }
    }
    return (
        <>
            <div className="homebox">
                <div className="mainhomecontainer">
                    <div className="homecontainer">
                        <div className="menu">
                            <div className="overlaybox">
                                <div className="suboverlaybox">
                                    <li class="material-symbols-outlined overlay-symbol" onClick={phoneassistantmenu}>assistant_navigation</li>
                                </div>
                                <div className="overlaymenu">
                                    <div className="dotmenuitems" onClick={createnewroom}>
                                        <p>Create Room</p>
                                    </div>
                                    <div className="dotmenuitems" onClick={logout}>
                                        <p>Logout</p>
                                    </div>
                                </div>
                            </div>
                            <div className="botsmenu">
                                <h1>Bots</h1>
                                {/*<div className="userbots">
                                    <div className="botpic">
                                        <li className="material-symbols-outlined chatheaderbotpic">account_circle</li>
                                         <div className="profilepic">

                                        </div> 
                                    </div>
                                    <div className="botname-lastmessage"onClick={enablechatdiv}>
                                        <div className="botname"> 
                                            <p>Jarvis</p>
                                            <span>12:33PM</span>
                                        </div>
                                        <div className="lastmessage">
                                            <p>this is your order sir</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="userbots">
                                    <div className="botpic">
                                        <li className="material-symbols-outlined chatheaderbotpic">account_circle</li>
                                         <div className="profilepic">
                                                
                                            </div> 
                                    </div>
                                    <div className="botname-lastmessage">
                                        <div className="botname">
                                            <p>Friday</p>                                  
                                            <span>21/1/2024</span>
                                        </div>
                                        <div className="lastmessage">
                                            <p>completed sir</p>
                                        </div>
                                    </div>
                                </div> */}
                                {userRooms.map((room)=>(
                                    <div key = {room.roomid} className="userbots" onClick={()=>enablechatdiv(room.name,room.roomid)}>
                                        <div className="botpic">
                                            <li className="material-symbols-outlined chatheaderbotpic">account_circle</li>
                                        </div>
                                        <div className="botname-lastmessage">
                                            <div className="botname">
                                                <p>{room.name}</p>
                                                {/* <span>{new Date(room.createdAt).toLocaleDateString()}</span> */}
                                                {/* {
                                                    JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)) && JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).length>0?(
                                                        (new Date(JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).at(-1).sent_at).toLocaleDateString() === new Date().toLocaleDateString()?(
                                                            <span>{new Date(JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).at(-1).sent_at).toLocaleTimeString()}</span>
                                                        ):(
                                                            <span>{new Date(JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).at(-1).sent_at).toLocaleDateString()}</span>
                                                        ))
                                                    ):(
                                                        <span>{new Date(room.createdAt).toLocaleDateString()}</span>
                                                    )
                                                } */}
                                                {
                                                    JSON.parse(localStorage.getItem(`roomid_${room.roomid}`))?(
                                                        (new Date(JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).sent_at).toLocaleDateString() === new Date().toLocaleDateString()?(
                                                            <span>{new Date(JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).sent_at).toLocaleTimeString()}</span>
                                                        ):(
                                                            <span>{new Date(JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).sent_at).toLocaleDateString()}</span>
                                                        ))
                                                    ):(
                                                        <span>{new Date(room.createdAt).toLocaleDateString()}</span>
                                                    )
                                                }
                                            </div>
                                            <div className="lastmessage">
                                                {/* <p>{room.name} is there...</p> */}
                                                {/* {
                                                    JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)) && JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).length>0?(
                                                        <p>{JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).at(-1).message}</p>
                                                    ):(
                                                        <p>{room.name} is there...</p>
                                                    )
                                                } */}
                                                {
                                                    JSON.parse(localStorage.getItem(`roomid_${room.roomid}`))?(
                                                        <p>{JSON.parse(localStorage.getItem(`roomid_${room.roomid}`)).message}</p>
                                                    ):(
                                                        <p>{room.name} is there...</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className="overlaybox">
                            <div className="suboverlaybox">
                                <li class="material-symbols-outlined overlay-symbol" onClick={phoneassistantmenu}>assistant_navigation</li>
                            </div>
                            <div className="overlaymenu">
                                <div className="dotmenuitems" onClick={createnewroom}>
                                    <p>Create Room</p>
                                </div>
                                <div className="dotmenuitems" >
                                    <p>Logout</p>
                                </div>
                            </div>
                        </div> */}
                        <div className="createroom">
                            <div className="subcreateroom">
                                <span class="material-symbols-outlined mobilescreencreateroomclose" onClick={cancelcreateroom} >chevron_left</span>
                                <span class="material-symbols-outlined bigscreencreateroomclose" onClick={cancelbigscreencreateroom} >close</span>
                                <p>create a new room</p>
                                <input type="text" required placeholder="enter your bot name" id="createnewroomnameinput"></input>
                                <button onClick={creatnewroombutton}>Create</button>
                                {/* <button>Cancel</button> */}
                            </div>
                        </div>
                        <div className="botchatbox">
                            <div className="chatheader">
                                <div className="backarrow">
                                    <span class="material-symbols-outlined" onClick={back}>chevron_left</span>
                                </div>
                                <div className="botpic" style={{width:"18%",display:"flex"}}>
                                    <li className="material-symbols-outlined chatheaderbotpic" style={{color:"white"}}>account_circle</li>
                                    {/* <div className="profilepic">
                                    </div> */}
                                </div>
                                <div className="chatheaderbotname">
                                    <div className="subchatheaderbotname">
                                        <p id="chatheaderbotnamepid">Jarvis</p>
                                        <span className="material-symbols-outlined"  onClick={triggerdotmenu}>more_vert</span>
                                         
                                    </div>
                                    <div className="lastmessage" style={{display:"flex",flexDirection:"row"}}>
                                        <div style={{width:"40%",height:"100%"}}>
                                            <p>online</p>
                                        </div>
                                        <div  style={{width:"60%",height:"100%",position:"relative"}}>
                                            <div id = "dotmenucontainer" className="dotmenucontainer">
                                                <div className="dotmenuitems" onClick={copyroomid}>
                                                    <p>Get Roomid</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="messagebox">
                                <div className="submessagebox">
                                    <div className="messagecontainer">
                                        {/* <div className="receivemessagebox">
                                            <div className="receivemessagebackgroundbox">
                                                <p>Hello boss</p>
                                            </div>
                                        </div>
                                        <div className="receivemessagebox">
                                            <div className="receivemessagebackgroundbox">
                                                <p>hii...</p>
                                            </div>
                                        </div>
                                        <div className="sendmessagebox">
                                            <div className="sendmessagebackgroundbox">
                                                <p>Hello</p>
                                            </div>
                                        </div>
                                        <div className="sendmessagebox">
                                            <div className="sendmessagebackgroundbox">
                                                <p>When you develop a mockup page or backend API is not ready for data fetching and you have to make Frontend Development with static data until it comes, react-lorem-ipsum will create your gibberish texts for you.</p>
                                            </div>
                                        </div>
                                        <div className="receivemessagebox">
                                            <div className="receivemessagebackgroundbox">
                                                <p>hii dubara se...</p>
                                            </div>
                                        </div>
                                        <div className="receivemessagebox">
                                            <img alt="https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" src="https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className="receivemessageimage" />
                                        </div>
                                        <div className="sendmessagebox">
                                            <img alt="https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className="receivemessageimage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-A9ZO8y-_0ywop3QtydYaeBSWmmvJgg7inw&usqp=CAU" />
                                        </div> */}
                                        {chatHistory.map((history)=>(
                                            history.sender == useremail?(
                                                <div className="sendmessagebox">
                                                    {history.type == 'text'?(
                                                        <div className="sendmessagebackgroundbox">
                                                            <p>{history.message}</p>
                                                        </div>    
                                                    ):(
                                                        <img className="receivemessageimage" src = {`data:image/png;base64,${history.message}`} />
                                                    )}
                                                </div>
                                            ):(
                                                <div className="receivemessagebox">
                                                    {history.type == 'text'?(
                                                        <div className="receivemessagebackgroundbox">
                                                            <p>{history.message}</p>
                                                        </div>
                                                    ):(
                                                        <img  className="receivemessageimage" src={`data:image/png;base64,${history.message}`} />
                                                    )}
                                                </div>
                                            )
                                        ))}

                                    </div>
                                </div>
                                <div className="messageinputbox">
                                    <div className="submessageinputbox">
                                        <input type="text"  id = "sendmessageinput" placeholder="message" onKeyDown={(event)=>{
                                            if (event.key === 'Enter'){
                                                sendMessage();
                                            }
                                        }}/>
                                        <span class="material-symbols-outlined" onClick={sendMessage}>send</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="actionbox">
                        <div style={{position:"relative"}}>
                            <div className="actionsmenu">
                                <div className="actionsmenuitems">
                                    <p onClick={createnewroom}>Create Room</p>
                                </div>
                                <div className="actionsmenuitems" onClick={logout}>
                                    <p>Logout</p>
                                </div>
                            </div>
                            <ul className="actions">
                                <li class="material-symbols-outlined navigation-symbol" onClick={assistantmenu}>assistant_navigation</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}


export default Home;