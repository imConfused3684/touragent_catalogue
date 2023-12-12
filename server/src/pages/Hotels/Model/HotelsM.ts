import { HotlesSQL } from "../../../Infrastructure/Repository/HotelsSQL";
import { HotelsR as R } from "../HotelsR";

export class HotelsM {
    private AnimalsSQL: HotlesSQL;

    constructor() {
        this.AnimalsSQL = new HotlesSQL();
    }

    public async getAllHotels(): Promise<R.getAll.ResponseI> {
        const vHotel = await this.AnimalsSQL.getAllHotels();

        return vHotel
    }

    public async getById(data: R.getById.RequestI): Promise<R.getById.ResponseI> {
        const vHotel = await this.AnimalsSQL.getById(data.id);

        return vHotel
    }
}