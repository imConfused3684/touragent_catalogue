export interface FilteredCards{
    showmore?: number,
    cards?: HotelsWithImage
}

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
        rating?: number;
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

export interface SearchS {
    name?: string;
}

export interface UserId {
    id?: number;
}

export class RatedHotelE {
    public static NAME = 'userratedhotel';
}

export class HotelTypesE {
    public static NAME = 'hotetype';
}

export class FoodTypesE {
    public static NAME = 'feeding';
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

