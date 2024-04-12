import { Request, Response } from 'express';
import { secretKey } from "../../config";
import { verify } from "jsonwebtoken";

export default function (req: Request, res: Response, next: Function) { 
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(403).json({message: "Пользователь не авторизован"});
        }
        const decodedData = verify(token, secretKey) as { tokenId: number; tokenAdmin:number };
        req.body.tokenId = decodedData.tokenId;
        req.body.tokenAdmin = decodedData.tokenAdmin;
        next();
    }
    catch(e){
        console.log(e);
        return res.status(403).json({message: "Пользователь не авторизован"});
    }

}