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
                .select('u.id');


        } catch (e) {
            console.log('login user check sql ERROR', e);
        }
        
        return vUser;
    }
}