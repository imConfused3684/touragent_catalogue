import { Router, Request, Response } from 'express';
import { HotelsR as R } from './HotelsR';
import { HotelsSQL } from "../../Infrastructure/Repository/HotelsSQL";
import authMiddleware from '../../middleware/authMiddleware';

const router = Router();

router.get(R.getAll.route, async (req, res) => {
    let response: R.getAll.ResponseI = {};

    response = await (new HotelsSQL).getAllHotels();
    
    res.json(response)
});

router.get(R.getById.route, async (req, res) => {
    const request = req.params as R.getById.RequestI;

    let response: R.getById.ResponseI = {};

    response = await (new HotelsSQL).getById(Number(request.id));
    
    res.json(response)
});

router.get(R.getLovedHotelByUserId.route, authMiddleware, async (req: Request, res: Response) => {
    const request = req.body as R.getLovedHotelByUserId.RequestI;

    let response: R.getLovedHotelByUserId.ResponseI = {};

    response = await (new HotelsSQL).getLovedHotelByUserId(request.tokenId);
    
    res.json(response)
});

router.post(R.getImage.route, async (req, res) => {
    const request = req.body as R.getImage.RequestI;

    let response: R.getImage.ResponseI = {};

    response = await (new HotelsSQL).getImage(request.id);
    
    res.json(response)
});

router.post(R.getFiltered.route, async (req, res) => {
    const request = req.body as R.getFiltered.RequestI;

    let response: R.getFiltered.ResponseI = {};

    response = await (new HotelsSQL).getFiltered(
        request.hotelTName, 
        request.hotelType,
        request.food,
        request.sort,
        request.budget,
        request.rating,
        request.nearWater,
        request.limit
    );
    
    res.json(response)
});

router.get(R.search.route, async (req, res) => {
    const request = req.params as R.search.RequestI;

    let response: R.search.ResponseI = {};

    response = await (new HotelsSQL).search(request.name);
    
    res.json(response)
});

router.post(R.rate.route, authMiddleware, async (req: Request, res: Response) => {
    try{
        console.log(req.body);

        const request = req.body as R.rate.RequestI;
        const sql = new HotelsSQL;

        console.log(request);
        const userCount = await sql.rateCount(request.tokenId, Number(request.id));

        if(!(userCount == 0)){
            return res.status(400).json({message: "Вы оже оценили этот отель"});
        }
        else{
            await sql.rate(Number(request.id), request.tokenId, Number(request.flag) == 1);
        }

    }catch(e){
        console.log(e);
        res.status(400).json({message: "Ошибка добавления оценки"});
    }
});

export default router 