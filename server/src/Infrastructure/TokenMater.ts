import { sign } from "jsonwebtoken";
import { secretKey } from "../../config";

export function generateAccsessToken(id: number, admin: number){
    const payload = {
        id,
        admin
    }

    return sign(payload, secretKey, {expiresIn: "24h"});
}