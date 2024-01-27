import React from "react";
import { useState,useEffect,useContext,createContext } from "react";
const AuthContext = createContext();
const AuthProvider = ({children})=>{
    const [authToken,setauthToken] = useState(null);
    useEffect(()=>{
        const data = localStorage.getItem("authToken");
        // console.log("this is data",data);
        if (data){
            setauthToken(data);
        }

    },[])
    return (
        <AuthContext.Provider value={[authToken,setauthToken]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=>{
    return useContext(AuthContext);
}

export {useAuth,AuthProvider}