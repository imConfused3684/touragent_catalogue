import { HotelsWithImage, LovedHotels, hotelById, Hotel, Service, Image, UsersE, HotelE, ImageE, ServiceE, UserHotelsE} from "../Entity/HotelsE";
import config from "../../../config";
import knex, { Knex } from "knex";

export class HotlesSQL {
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
}