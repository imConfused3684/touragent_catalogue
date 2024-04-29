export interface CatalogueCard{
    id: number,
    name: string,
    price: number,
    rating: number,
    base64: string
}

export interface Hotel{
    aHotel: {
        id: number,
        name: string,
        price: number,
        rating: number,
        description: string,
        base64: string,
        feedName: string,
        typeName: string,
        nearWater: number
    }

    aServices: {
        ser_id: number,
        name: string,
        description: string
    }[]
}

export interface FavouriteCard{
    id: number,
    name: string,
    price: number,
    rating: number,
    description: string,
    base64: string
}

export interface Image{
    img_id: number,
    base64: string,
}

export interface SearchList{
    name: string
}

export interface FavFlag{
    flag: number
}

export interface AddResponse{
    message: string
}