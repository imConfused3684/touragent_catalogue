export interface UserId {

    id?: number;
    login?: string;
    admin?: number
}

export interface Lists{
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

export interface Hotel {
    id?: number;
    name?: string;
    price?: number;
    description?: string;
    image?: string;
}


export class UsersE {
    public static NAME = 'user';
}

export class HotelE {
    public static NAME = 'hotel'
}

export class ImageE {
    public static NAME = 'image'
}

export class ServiceE {
    public static NAME = 'service'
}

export class UserHotelsE {
    public static NAME = 'user_loves_hotel'
}