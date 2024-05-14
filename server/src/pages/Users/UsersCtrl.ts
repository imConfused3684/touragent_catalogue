import { Router, Request, Response } from 'express';
import { UsersR as R } from './UsersR';
import { UsersSQL } from "../../Infrastructure/Repository/UsersSQL";
import { check, validationResult } from "express-validator";
import authMiddleware from '../../middleware/authMiddleware';

import { sign } from "jsonwebtoken";
import { secretKey, lifetime } from "../../../config";
function generateAccsessToken(tokenId?: number, tokenAdmin?: number){
    const payload = {
        tokenId,
        tokenAdmin
    }

    return sign(payload, secretKey, {expiresIn: lifetime});
}

const router = Router();

router.post(R.loginCheck.route, async (req, res) => {
    try{
        const request = req.body as R.loginCheck.RequestI;
        const sql = new UsersSQL;

        const userCount = await sql.nameCount(request.login);

            if(userCount == 0){
                res.status(400).json({message: "Пользователь с таким именем не найден"});
            }
            else{
                const response = await sql.loginCheck(request.login, request.password);
                response?.id ? res.json({"token":generateAccsessToken(response.id, response.admin)}) : res.status(400).json({message: "Пароль неправильный"});
            }

    }catch(e){
        console.log(e);
        res.status(400).json({message: "Ошибка авторизации"});
    }
});

router.post(R.registration.route, [
    check("login", "Имя пользователя не может быть пустым").notEmpty(),
    check("login", "Имя пользователя не может быть длинее 25 символов").isLength({min: 0, max: 25}),
    check("password", "Пароль должен быть длиной от 4 до 16 символов").isLength({min: 4, max: 16}),
], async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(400).json({message: errors.array()[0].msg});
        }
        else{
            const request = req.body as R.registration.RequestI;
            const sql = new UsersSQL;
            const userCount = await sql.nameCount(request.login);

            if(userCount != 0){
                res.status(400).json({message: "Пользователь с таким именем уже существует"});
            }
            else{
                const response = await sql.registration(request.login, request.password);
                response?.id ? res.json({"token":generateAccsessToken(response.id, response.admin)}) : res.status(400).json({message: "Непредвиденная ошибка"});
            }
        }
        
        
    }catch(e){
        console.log(e);
        res.status(400).json({message: "Ошибка регистрации"});
    }
});

router.post(R.tokencheck.route, authMiddleware, async (req: Request, res:Response) => {
    res.json({adm: req.body.tokenAdmin});
});

router.post(R.lists.route, authMiddleware, async (req: Request, res: Response) => {
    try{
        
        let response: R.lists.ResponseI = {};

        response = await (new UsersSQL).getLists();
        
        res.json(response)

    }catch(e){
        console.log(e);
        res.status(400).json({message: "Ошибка получения данных"});
    }
});

export default router 