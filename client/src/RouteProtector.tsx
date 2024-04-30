import { Navigate } from "react-router-dom";
import { tokencheck } from "./common/service/userService";
import { useEffect, useState } from "react";

export default function RouteProtector({needProtection}:{needProtection: React.ReactElement}){
    const [auth, setAuth] = useState<boolean | null>(null);

    useEffect(()=>{
        const token = localStorage.getItem('travelToken');
        if(token){
            tokencheck(token).then((response)=>{
                if(response.adm === undefined){
                    localStorage.removeItem('travelToken');
                    setAuth(false);
                }
                else{
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
        return needProtection;
    }
    else{
        return <Navigate to="/login" />;
    }
}