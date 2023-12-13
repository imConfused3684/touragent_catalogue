export interface HotelsWithImage {

    id?: number;
    name?: string;
    price?: number;
    image?: string;
}

export interface Images{
    img_id?: number;
    image?: string;
}

export interface hotelById {

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

export interface Hotel {
    id?: number;
    name?: string;
    price?: number;
    description?: string;
    image?: string;
}

export interface Service {
    id?: number;
    name?: string;
    description?: string;
}

export interface Image {
    img_id?: number;
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

