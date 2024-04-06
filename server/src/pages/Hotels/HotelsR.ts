export namespace HotelsR {

    export namespace getLovedHotelByUserId {
        export const route = '/hotel/getLovedByUserId';

        export interface RequestI {
            id: number;
        }

        export interface ResponseI {
            id?: number;
            name?: string;
            price?: number;
            description?: string;
            image?: string;
        }
    }

    export namespace getImage {
        export const route = '/hotel/image';

        export interface RequestI {
            id: number;
        }

        export interface ResponseI {
            id?: number;
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
                
                food?: string;
                type?: string;
                nearWater?: number;
            }

            aServices?: {
                id?: number;
                name?: string;
                description?: string;
            }
        }
    }

    export namespace getFiltered {
        export const route = '/hotel/getFiltered';

        export interface RequestI {
            hotelTName: string,
            hotelType: number,
            food: number,
            sort: number,
            budget: number,
            rating: number,
            nearWater: number,
            limit: number
        }

        export interface ResponseI {
            id?: number;
            name?: string;
            price?: number;
            image?: string;
        }
    }

    export namespace search {
        export const route = '/hotel/search/:name';

        export interface RequestI {
            name: string
        }

        export interface ResponseI {
            name?: string;
        }
    }
}