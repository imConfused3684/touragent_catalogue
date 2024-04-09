import { Router, Request, Response } from 'express';
import { UsersR as R } from './UsersR';
import { UsersSQL } from "../../Infrastructure/Repository/UsersSQL";
import { check, validationResult } from "express-validator";

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
                res.json(response);
            }

    }catch(e){
        console.log(e);
        res.status(400).json({message: "Login error"});
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
                res.json(response);
            }
        }
        
        
    }catch(e){
        console.log(e);
        res.status(400).json({message: "Registartion error"});
    }
});

export default router 