import { UserId, UsersE} from "../Entity/UsersE";
import config from "../../../config";
import knex, { Knex } from "knex";

export class UsersSQL {
    db: Knex;

    constructor() {
        this.db = knex(config)
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
}