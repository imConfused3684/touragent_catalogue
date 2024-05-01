import { HotelsWithImage, hotelById, Hotel, Service, Image, SearchS, HotelE, ImageE, ServiceE, UserHotelsE, FoodTypesE, HotelTypesE, UserId, RatedHotelE} from "../Entity/HotelsE";
import { knexconfig } from "../../../config";
import knex, { Knex } from "knex";

export class HotelsSQL {
    db: Knex;

    constructor() {
        this.db = knex(knexconfig)
    }

    public async getAllHotels(): Promise<HotelsWithImage> {
        let vHotel: HotelsWithImage = {};

        try {
            vHotel = await this.db<HotelsWithImage>({ h: HotelE.NAME })
                .leftJoin({ img: ImageE.NAME }, 'img.hotel_id', 'h.id')
                .where('img.img_id', 0)
                .limit(3)
                .offset(0)
                .select('h.id', 'h.name', 'h.price', 'h.rating', 'img.base64');
        } catch (e) {
            console.log('get all hotels witg imgs sql ERROR', e);
        }

        return vHotel;
    }

    public async getById(nId: number): Promise<hotelById> {
        let vHotelWithServ: hotelById = {};
        
        try {

            vHotelWithServ = {

                aHotel: await this.db<Hotel>({ h: HotelE.NAME })
                    .leftJoin({ img: ImageE.NAME }, 'img.hotel_id', 'h.id')
                    .leftJoin({ food: FoodTypesE.NAME }, 'food.feedId', 'h.feedId')
                    .leftJoin({ ht: HotelTypesE.NAME }, 'ht.id', 'h.typeId')
                    .where('img.img_id', 0)
                    .andWhere('h.id', nId)
                    .select('h.id', 'h.name', 'h.price', 'h.rating','h.description','img.base64', 'food.feedName', 'ht.typeName', 'h.nearWater')
                    .first(),

                aServices: await this.db<Service>({ serv: ServiceE.NAME })
                    .where('serv.hotel_id', nId)
                    .orderBy( 'serv.ser_id', 'asc')
                    .select('serv.ser_id', 'serv.name', 'serv.description')
            }

        } catch (e) {
            console.log('get hotel with services by id sql ERROR', e);
        }

        return vHotelWithServ;
    }

    public async getLovedHotelByUserId(nId: number): Promise<Hotel> {
        let vHotel: Hotel = {};

        try {
            vHotel = await this.db<Hotel>({ use: UserHotelsE.NAME })
                .leftJoin({ h: HotelE.NAME }, 'h.id', 'use.hotel_id')
                .leftJoin({ img: ImageE.NAME }, 'img.hotel_id', 'h.id')
                .where('img.img_id', 0)
                .andWhere('use.user_id', nId)
                .select('h.id', 'h.name', 'h.price', 'h.rating', 'h.description','img.base64');
        } catch (e) {
            console.log('get all hotels witg imgs sql ERROR', e);
        }

        return vHotel;
    }

    public async getImage(nId: number): Promise<Image> {
        let vImage: Image = {};

        try {
            vImage = await this.db<Hotel>({ img: ImageE.NAME })
                .where('img.hotel_id', nId)
                .orderBy( 'img.img_id', 'asc')
                .select('img.img_id','img.base64');
        } catch (e) {
            console.log('get all hotels witg imgs sql ERROR', e);
        }

        return vImage;
    }

    public async getFiltered(
        sHotelTName: string, 
        nHotelType: number,
        nFood: number,
        nSort: number,
        nBudget: number,
        nRating: number,
        nNearWater: number,
        nLimit: number
    ): Promise<HotelsWithImage> {
        let vFilteredHotels: HotelsWithImage = {};

        try {
            vFilteredHotels = await this.db<HotelsWithImage>({ h: HotelE.NAME })
            .leftJoin({ img: ImageE.NAME }, 'img.hotel_id', 'h.id')
            .where('img.img_id', 0)
            .andWhere('h.name', 'like', "%" + sHotelTName + "%")
            .andWhere('h.price', '<=', nBudget)
            .andWhere(function () {
                if (nHotelType != -1) {
                    this.andWhere('h.typeId', nHotelType);
                }
                if (nFood != -1) {
                    this.andWhere('h.feedId', nFood);
                }
                if (nRating != -1) {
                    this.andWhere('h.rating', '>=', nRating);
                }
                if (nNearWater != 0) {
                    this.andWhere('h.nearWater', 1);
                }
            })
            .limit(3 + nLimit)
            .orderByRaw(`${nSort == 1 ? 'h.price desc' : nSort == 2 ? 'h.rating desc' : 'h.id asc'}`)
            .select('h.id', 'h.name', 'h.price', 'h.rating', 'img.base64');
        } catch (e) {
            console.log('get all hotels witg imgs sql ERROR', e);
        }

        return vFilteredHotels;
    }

    public async search(sHotelTName: string): Promise<SearchS> {
        let vName: SearchS = {};

        try {
            vName = await this.db<SearchS>({ h: HotelE.NAME })
            .where('h.name', 'like', sHotelTName + "%")
            .select('h.name');
        } catch (e) {
            console.log('get all hotels witg imgs sql ERROR', e);
        }

        return vName;
    }

    public async rateCount(nuId: number, nhId: number): Promise<number>{
        return (await this.db<UserId>({ rh: RatedHotelE.NAME }).where('rh.user_id', nuId).andWhere('rh.hotel_id', nhId).select('rh.user_id')).length;
    }

    public async rate(nhId: number, nuId: number, flag:boolean) {
        await this.db.raw(`call changeRating(${nhId}, ${nuId}, ${flag ? 'true' : 'false'})`);
    }

    public async isfavourite(nhId: number, nuId: number): Promise<number> {
        return (await this.db<UserId>({ uh: UserHotelsE.NAME }).where('uh.user_id', nuId).andWhere('uh.hotel_id', nhId).select('uh.user_id')).length;
    }

    public async changeFavourite(nhId: number, nuId: number){
        if((await this.isfavourite(nhId, nuId)) == 0){
            await this.db.insert([{user_id: nuId, hotel_id: nhId}]).into(UserHotelsE.NAME);
        }
        else{
            await this.db({ uh: UserHotelsE.NAME }).where('uh.user_id', nuId).andWhere('uh.hotel_id', nhId).delete();
        }
    }

    public async add(
            name: string,
            price: number,
            img: string,
            description: string,
            typeId: number,
            feedId: number,
            nearWater: number,
            servs: {
                ser_id: number,
                name: string,
                description: string
            }[])
    {
        const [hotelId] = await this.db.insert({
            name: name,
            price: price,
            description: description,
            typeId: typeId,
            feedId: feedId,
            nearWater: nearWater
        }).into(HotelE.NAME);

        await this.db.insert({
            hotel_id: hotelId,
            img_id: 0,
            base64: img
        }).into(ImageE.NAME);

        for (let i = 0; i < servs.length; i++) {
            await this.db.insert({
                hotel_id: hotelId,
                ser_id: servs[i].ser_id,
                name: servs[i].name,
                description: servs[i].description
            }).into(ServiceE.NAME);
        }
    }
}