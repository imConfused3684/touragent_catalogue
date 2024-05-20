export interface lists{
    aObjects: { 
        id: number,
        name: string,
        price: number,
        rating: number
    }[]

    aUsers: { 
        id: number,
        login: string,
        admin: number
    }[]
}