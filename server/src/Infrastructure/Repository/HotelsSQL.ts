import { HotelsWithImage, hotelById, Hotel, Service, Image, HotelE, ImageE, ServiceE, UserHotelsE} from "../Entity/HotelsE";
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
                    .where('img.img_id', 0)
                    .andWhere('h.id', nId)
                    .select('h.id', 'h.name', 'h.price', 'h.description','img.base64')
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
}