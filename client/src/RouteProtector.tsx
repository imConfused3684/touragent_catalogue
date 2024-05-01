import { Navigate } from "react-router-dom";
import { tokencheck } from "./common/service/userService";
import { useEffect, useState } from "react";

interface Props{
    needProtection: React.ReactElement;
    needAdminStatus: boolean;
}

export default function RouteProtector({needProtection, needAdminStatus}:Props){
    const [auth, setAuth] = useState<boolean | null>(null);
    const [adminStatus, setAdminStatus] = useState<boolean>(false);

    useEffect(()=>{
        const token = localStorage.getItem('travelToken');
        if(token){
            tokencheck(token).then((response)=>{
                if(response.adm === undefined){
                    localStorage.removeItem('travelToken');
                    setAuth(false);
                }
                else{
                    setAdminStatus(response.adm == 1)
                    setAuth(true);
                }
            });
        }
        else{
            setAuth(false);
        }
    },[]);

    if(auth === null) return <></>;
    if(auth){
        if(needAdminStatus == true && adminStatus == false){
            return <Navigate to="/" />;
        }
        else{
            return needProtection;
        }
        
    }
    else{
        return <Navigate to="/login" />;
    }
}