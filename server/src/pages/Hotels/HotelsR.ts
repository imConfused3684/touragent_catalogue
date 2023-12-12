export namespace HotelsR {

    export namespace getLovedHotelById {
        export const route = '/hotel/getLovedById';

        export interface RequestI {
            id: number;
        }

        export interface ResponseI {
            name?: string;
            description?: string;
            image?: string;
        }
    }

    export namespace getAll {
        export const route = '/hotel/getAll';

        export interface ResponseI {
            id?: number;
            name?: string;
            price?: number;
            image?: string;
        }
    }


    export namespace getById {
        export const route = '/hotel/getById';

        export interface RequestI {
            id: number;
        }

        export interface ResponseI {

            aHotel?: {
                id?: number;
                name?: string;
                price?: number;
                description?: string;
                image?: string;
            }

            aServices?: {
                id?: number;
                name?: string;
                description?: string;
            }
        }
    }
}