import { Router, Request, Response } from 'express';
import { HotelsR as R } from './HotelsR';
import { HotelsSQL } from "../../Infrastructure/Repository/HotelsSQL";
import authMiddleware from '../../middleware/authMiddleware';
import { maxprice } from "../../../config";

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
        const request = req.body as R.rate.RequestI;
        const sql = new HotelsSQL;
        const userCount = await sql.rateCount(request.tokenId, request.id);

        if(!(userCount == 0)){
            return res.status(400).json({message: "Вы уже оценили этот отель"});
        }
        else{
            await sql.rate(request.id, request.tokenId, request.flag == 1);
        }

        res.json("ok");

    }catch(e){
        console.log(e);
        res.status(400).json({message: "Ошибка добавления оценки"});
    }
});

router.post(R.isfavourite.route, authMiddleware, async (req: Request, res: Response) => {
    try{
        const request = req.body as R.isfavourite.RequestI;
        const sql = new HotelsSQL;
       
        res.json({flag: await sql.isfavourite(request.id, request.tokenId)});
    }catch(e){
        console.log(e);
        res.status(400).json({message: "Непредвиденная ошибка"});
    }
});

router.post(R.changefavourite.route, authMiddleware, async (req: Request, res: Response) => {
    try{
        const request = req.body as R.changefavourite.RequestI;
        const sql = new HotelsSQL;

        await sql.changeFavourite(request.id, request.tokenId);

        res.json("ok");

    }catch(e){
        console.log(e);
        res.status(400).json({message: "Ошибка изменения избранного"});
    }
});

router.post(R.add.route, authMiddleware, async (req: Request, res: Response) => {
    try{
        const request = req.body as R.add.RequestI;
        if(request.price > maxprice){
            res.status(400).json({message: "Введены неправильные данные"});
        }
        else if(request.tokenAdmin == 1){
            const sql = new HotelsSQL;

            await sql.add(
                          request.name, 
                          request.price,
                          request.img, 
                          request.description, 
                          request.hotelType, 
                          request.food, 
                          request.nearWater, 
                          request.servs
                        );

            res.json({message: "Добавление успешно"});
        }
        else{
            res.status(403).json({message: "У вас недостаточно прав"});
        }

    }catch(e){
        console.log(e);
        res.status(400).json({message: "Ошибка добавления"});
    }
});

export default router 