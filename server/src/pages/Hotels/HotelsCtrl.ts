import { Router } from 'express';
import { HotelsR as R } from './HotelsR';
import { HotelsM } from './Model/HotelsM';

const router = Router();

export class AnimalsCtrl {
    public HotelsM: HotelsM

    constructor() {
        this.HotelsM = new HotelsM();
    }
}

router.get(R.getAll.route, async (req, res) => {
    let response: R.getAll.ResponseI = {};

    const ctrl = new AnimalsCtrl();
    response = await ctrl.HotelsM.getAllHotels();
    
    res.json(response)
});

router.post(R.getById.route, async (req, res) => {
    const request = req.body as R.getById.RequestI;

    let response: R.getById.ResponseI = {};

    const ctrl = new AnimalsCtrl();
    response = await ctrl.HotelsM.getById(request);
    
    res.json(response)
});

export default router 