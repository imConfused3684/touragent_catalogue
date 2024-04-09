import { Router } from 'express';
import { UsersR as R } from './UsersR';
import { UsersSQL } from "../../Infrastructure/Repository/UsersSQL";

const router = Router();


router.post(R.loginCheck.route, async (req, res) => {

    const request = req.body as R.loginCheck.RequestI;

    const response = await (new UsersSQL).loginCheck(request.login, request.password);

    res.json(response)
});

export default router 