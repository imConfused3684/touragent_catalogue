import { Router } from 'express';
import { HotelsR as R } from './HotelsR';
import { HotelsM } from './Model/HotelsM';

const router = Router();

export class HotelsCtrl {
    public HotelsM: HotelsM

    constructor() {
        this.HotelsM = new HotelsM();
    }
}

router.get(R.getAll.route, async (req, res) => {
    let response: R.getAll.ResponseI = {};

    const ctrl = new HotelsCtrl();
    response = await ctrl.HotelsM.getAllHotels();
    
    res.json(response)
});

router.get(R.getById.route, async (req, res) => {
    const request = req.params as R.getById.RequestI;

    let response: R.getById.ResponseI = {};

    const ctrl = new HotelsCtrl();
    response = await ctrl.HotelsM.getById(request);
    
    res.json(response)
});

router.post(R.getLovedHotelByUserId.route, async (req, res) => {
    const request = req.body as R.getLovedHotelByUserId.RequestI;

    let response: R.getLovedHotelByUserId.ResponseI = {};

    const ctrl = new HotelsCtrl();
    response = await ctrl.HotelsM.getLovedHotelByUserId(request);
    
    res.json(response)
});

router.post(R.getImage.route, async (req, res) => {
    const request = req.body as R.getImage.RequestI;

    let response: R.getImage.ResponseI = {};

    const ctrl = new HotelsCtrl();
    response = await ctrl.HotelsM.getImage(request);
    
    res.json(response)
});

router.post(R.getFiltered.route, async (req, res) => {
    const request = req.body as R.getFiltered.RequestI;

    let response: R.getFiltered.ResponseI = {};

    const ctrl = new HotelsCtrl();
    response = await ctrl.HotelsM.getFiltered(request);
    
    res.json(response)
});

router.get(R.search.route, async (req, res) => {
    const request = req.params as R.search.RequestI;

    let response: R.search.ResponseI = {};

    const ctrl = new HotelsCtrl();
    response = await ctrl.HotelsM.search(request);
    
    res.json(response)
});

export default router 