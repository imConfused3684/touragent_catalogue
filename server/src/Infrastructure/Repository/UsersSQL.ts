import { UserId, UsersE, Lists, HotelE, Hotel} from "../Entity/UsersE";
import { knexconfig } from "../../../config";
import knex, { Knex } from "knex";

export class UsersSQL {
    db: Knex;

    constructor() {
        this.db = knex(knexconfig)
    }

    public async loginCheck(sLogin: string, sPassword: string){
        let vUser: UserId = {};

        try {
            vUser = await this.db<UserId>({ u: UsersE.NAME })
                .where('u.login', sLogin)
                .andWhere('u.password', sPassword)
                .select('u.id', 'u.admin').first();


        } catch (e) {
            console.log('login user check sql ERROR', e);
            throw e;
        }
        
        return vUser;
    }

    public async nameCount(sLogin: string){
        return (await this.db<UserId>({ u: UsersE.NAME }).where('u.login', sLogin).select('u.id')).length;
    }

    public async registration(sLogin: string, sPassword: string){
        let vUser: UserId = {};

        try {
            await this.db
            .insert([{login: sLogin, password: sPassword}])
            .into(UsersE.NAME);
            
            vUser = await this.db<UserId>({ u: UsersE.NAME })
                .where('u.login', sLogin)
                .andWhere('u.password', sPassword)
                .select('u.id', 'u.admin').first();
        } catch (e) {
            console.log('login user check sql ERROR', e);
            throw e;
        }
        
        return vUser;
    }

    public async getLists(): Promise<Lists> {
        let lists: Lists = {};

        try {
            lists.aObjects = await this.db<Hotel>({ h: HotelE.NAME })
            .select('h.id', 'h.name', 'h.price', 'h.rating');

            lists.aUsers = await this.db<UserId>({ u: UsersE.NAME })
            .select('u.id', 'u.login', 'u.admin');

        } catch (e) {
            console.log('get all hotels witg imgs sql ERROR', e);
        }

        return lists;
    }
}