import { HotelsWithImage, hotelById, Hotel, Service, Image, SearchS, HotelE, ImageE, ServiceE, UserHotelsE, FoodTypesE, HotelTypesE} from "../Entity/HotelsE";
import config from "../../../config";
import knex, { Knex } from "knex";

export class HotelsSQL {
    db: Knex;

    constructor() {
        this.db = knex(config)
    }

    public async getAllHotels(): Promise<HotelsWithImage> {
        let vHotel: HotelsWithImage = {};

        try {
            vHotel = await this.db<HotelsWithImage>({ h: HotelE.NAME })
                .leftJoin({ img: ImageE.NAME }, 'img.hotel_id', 'h.id')
                .where('img.img_id', 0)
                .limit(3)
                .offset(0)
                .select('h.id', 'h.name', 'h.price','img.base64');
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
                    .select('h.id', 'h.name', 'h.price', 'h.description','img.base64', 'food.feedName', 'ht.typeName', 'h.nearWater')
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
                .select('h.id', 'h.name', 'h.price', 'h.description','img.base64');
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
                if (nSort == 1) {
                    this.orderBy('h.price', 'desc');
                }
                if (nSort == 2) {
                    this.orderBy('h.rating', 'desc');
                }
            })
            .limit(3 + nLimit)
            .select('h.id', 'h.name', 'h.price','img.base64');
        } catch (e) {
            console.log('get all hotels witg imgs sql ERROR', e);
        }
        //console.log("--------------------limit " + nLimit + " \n")
        //console.log(vFilteredHotels)

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

}