export namespace UsersR{
    
    export namespace loginCheck {
        export const route = '/users/loginCheck';

        export interface RequestI {
            "login": string,
            "password": string
        }

        export interface ResponseI {
            "id"?: number 
        }

    }

}