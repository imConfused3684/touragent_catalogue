import { Router } from 'express';
import { UsersR as R } from './UsersR';
import { UsersM } from './Model/UsersM';

const router = Router();

export class UsersCtrl {
    public UsersM: UsersM

    constructor() {
        this.UsersM = new UsersM();
    }
}

router.post(R.loginCheck.route, async (req, res) => {

    const request = req.body as R.loginCheck.RequestI;

    const ctrl = new UsersCtrl();
    const response = await ctrl.UsersM.loginCheck(request);

    res.json(response)
});

export default router 