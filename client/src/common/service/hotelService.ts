import FetchData from "./dataFetchService";

export async function getAll() {
    const response = await FetchData("", "/hotel/getAll", {});

    return response;
}

export async function getById(id: number) {
    const response = await FetchData("", `/hotel/getById/${id}`, {});

    return response;
}

export async function getLovedHotelByUserId(token: string) {
    const response = await FetchData(token, "/hotel/getLovedByUserId", {});

    return response;
}

export async function getImage(id: number) {
    const response = await FetchData("", "/hotel/image", {"id": id});

    return response;
}

export async function getFiltered(hotelTName: string, hotelType: number, food: number, sort: number, budget: number, rating: number, nearWater: number, limit: number) {
    const response = await FetchData("", "/hotel/getFiltered", 
        {
            "hotelTName": hotelTName,
            "hotelType": hotelType,
            "food": food,
            "sort": sort,
            "budget": budget,
            "rating": rating,
            "nearWater": nearWater,
            "limit": limit
        });

    return response;
}

export async function search(name: string): Promise<{name: string}[]> {
    const response = await FetchData("", `/hotel/search/${name}`, {});

    return response;
}

export async function rate(token: string ,id: number, flag: number) {
    const response = await FetchData(token, "/hotel/rate", {"id": id, "flag": flag});

    return response;
}

export async function isfavourite(token: string ,id: number) {
    const response = await FetchData(token, "/hotel/isfavourite", {"id": id});

    return response;
}

export async function changefavourite(token: string , 
        name: string,
        price: number,
        img: string,
        description: string,
        hotelType: number,
        food: number,
        nearWater: number,
        servs: Array<string>
    ) {
    const response = await FetchData(token, "/hotel/add", 
        {
            "name": name,
            "price": price,
            "img": img,
            "description": description,
            "hotelType": hotelType,
            "food": food,
            "nearWater": nearWater,
            "servs": servs
        });

    return response;
}