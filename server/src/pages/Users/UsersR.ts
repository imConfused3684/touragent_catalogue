export namespace UsersR{
    
    export namespace loginCheck {
        export const route = '/users/loginCheck';

        export interface RequestI {
            login: string,
            password: string
        }

        export interface ResponseI {
            id?: number,
            admin?: number  
        }

    }

    export namespace registration {
        export const route = '/users/registration';

        export interface RequestI {
            login: string,
            password: string
        }

        export interface ResponseI {
            id?: number,
            admin?: number 
        }

    }

    export namespace tokencheck {
        export const route = '/users/tokencheck';
    }

    export namespace lists {
        export const route = '/lists';

        export interface ResponseI {
            aObjects?: { 
                id: number,
                name: string,
                price: number,
                rating: number
            }

            aUsers?: { 
                id: number,
                login: string,
                admin: number
            }
        }

    }
}