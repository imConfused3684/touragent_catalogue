import { UsersSQL } from "../../../Infrastructure/Repository/UsersSQL";
import { UsersR as R } from "../UsersR";

export class UsersM{

    private UsersSQL: UsersSQL;

    constructor() {
        this.UsersSQL = new UsersSQL();
    }

    public async loginCheck(data: R.loginCheck.RequestI) {
        const vUser = await this.UsersSQL.loginCheck(data.login, data.password);

        return vUser
    }

}