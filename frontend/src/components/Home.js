import React from "react";
import './Home.css';

const Home = ()=>{
    const enablechatdiv = ()=>{
        console.log("chatmenu clicked")
        console.log(!document.getElementsByClassName("botchatbox")[0].style.display);
        let chatmenuboxdiv = document.getElementsByClassName("menu")[0];
        let homecontainerdiv = document.getElementsByClassName("homecontainer")[0];
        console.log(chatmenuboxdiv.offsetWidth ,homecontainerdiv.offsetWidth)
        if(document.getElementsByClassName("botchatbox")[0].style.display === 'none' || !document.getElementsByClassName("botchatbox")[0].style.display){
            if (chatmenuboxdiv.offsetWidth === homecontainerdiv.offsetWidth){
                document.getElementsByClassName("botchatbox")[0].style.display='flex';
                document.getElementsByClassName("menu")[0].style.display = 'none';
                document.getElementsByClassName("overlaybox")[0].style.display = 'none';
            }else{
                document.getElementsByClassName("botchatbox")[0].style.display='flex';
            }
        }
        else{
            document.getElementsByClassName("botchatbox")[0].style.display='none';
        }
    }
    const back = ()=>{
        document.getElementsByClassName("botchatbox")[0].style.display = 'none';
        document.getElementsByClassName("menu")[0].style.display = 'flex';
        document.getElementsByClassName("overlaybox")[0].style.display = 'flex';
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
                                    <div className="dotmenuitems" >
                                        <p>Logout</p>
                                    </div>
                                </div>
                            </div>
                            <div className="botsmenu">
                                <h1>Bots</h1>
                                <div className="userbots">
                                    <div className="botpic">
                                        <li className="material-symbols-outlined chatheaderbotpic">account_circle</li>
                                        {/* <div className="profilepic">

                                        </div> */}
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
                                        {/* <div className="profilepic">
                                                
                                            </div> */}
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
                                </div>
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
                                <input type="text" required placeholder="enter your bot name"></input>
                                <button>Create</button>
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
                                        <p>Jarvis</p>
                                        <span className="material-symbols-outlined"  onClick={triggerdotmenu}>more_vert</span>
                                         
                                    </div>
                                    <div className="lastmessage" style={{display:"flex",flexDirection:"row"}}>
                                        <div style={{width:"40%",height:"100%"}}>
                                            <p>online</p>
                                        </div>
                                        <div  style={{width:"60%",height:"100%",position:"relative"}}>
                                            <div id = "dotmenucontainer" className="dotmenucontainer">
                                                <div className="dotmenuitems">
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
                                        <div className="receivemessagebox">
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

                                    </div>
                                </div>
                                <div className="messageinputbox">
                                    <div className="submessageinputbox">
                                        <input type="text"  placeholder="message"/>
                                        <span class="material-symbols-outlined">send</span>
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
                                <div className="actionsmenuitems">
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