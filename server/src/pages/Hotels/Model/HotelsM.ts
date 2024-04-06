import { HotelsSQL } from "../../../Infrastructure/Repository/HotelsSQL";
import { HotelsR as R } from "../HotelsR";

export class HotelsM {
    private HitelsSQL: HotelsSQL;

    constructor() {
        this.HitelsSQL = new HotelsSQL();
    }

    public async getAllHotels(): Promise<R.getAll.ResponseI> {
        const vHotel = await this.HitelsSQL.getAllHotels();

        return vHotel
    }

    public async getById(data: R.getById.RequestI): Promise<R.getById.ResponseI> {
        console.log(data.id);
        console.log(data);
        const vHotel = await this.HitelsSQL.getById(Number(data.id));

        return vHotel
    }

    public async getLovedHotelByUserId(data: R.getLovedHotelByUserId.RequestI): Promise<R.getLovedHotelByUserId.ResponseI> {
        const vHotel = await this.HitelsSQL.getLovedHotelByUserId(data.id);

        return vHotel
    }

    public async getImage(data: R.getImage.RequestI): Promise<R.getImage.ResponseI> {
        const vImage = await this.HitelsSQL.getImage(data.id);

        return vImage
    }

    public async getFiltered(data: R.getFiltered.RequestI): Promise<R.getFiltered.ResponseI> {
        const vFilter = await this.HitelsSQL.getFiltered(
            data.hotelTName, 
            data.hotelType,
            data.food,
            data.sort,
            data.budget,
            data.rating,
            data.nearWater,
            data.limit
        );

        console.log(data);

        return vFilter
    }

    public async search(data: R.search.RequestI): Promise<R.search.ResponseI> {
        const vImage = await this.HitelsSQL.search(data.name);

        console.log(data);

        return vImage
    }
}