export namespace HotelsR {

    export namespace getLovedHotelByUserId {
        export const route = '/hotel/getLovedByUserId';

        export interface RequestI {
            tokenId: number;
        }

        export interface ResponseI {
            id?: number;
            name?: string;
            price?: number;
            rating?: number,
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
            rating?: number;
            image?: string;
        }
    }


    export namespace getById {
        export const route = '/hotel/getById/:id';

        export interface RequestI {
            id: string;
        }

        export interface ResponseI {

            aHotel?: {
                id?: number;
                name?: string;
                price?: number;
                rating?: number;
                description?: string;
                image?: string;
                
                food?: string;
                type?: string;
                nearWater?: number;
            }

            aServices?: {
                ser_id?: number;
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
            showmore?: number,
            cards?: {
                id?: number;
                name?: string;
                price?: number;
                image?: string;
            }

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

    export namespace rate {
        export const route = '/hotel/rate';

        export interface RequestI {
            id: number,
            tokenId: number,
            flag: number
        }
    }

    export namespace isfavourite {
        export const route = '/hotel/isfavourite';

        export interface RequestI {
            id: number,
            tokenId: number,
        }
    }
 
    export namespace changefavourite {
        export const route = '/hotel/changefavourite';

        export interface RequestI {
            id: number,
            tokenId: number
        }
    }

    export namespace add{
        export const route = '/hotel/add';

        export interface RequestI{
            tokenAdmin:number,
            name: string,
            price: number,
            img: string,
            description: string,
            hotelType: number,
            food: number,
            nearWater: number,
            servs: {
                ser_id: number,
                name: string,
                description: string
            }[]
        }
    }
}