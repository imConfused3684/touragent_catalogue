import FetchData from "./dataFetchService";

export async function loginCheck(login: string, password: string)
{
    const response = await FetchData("", "/users/loginCheck", {"login": login, "password": password});

    return response;
}

export async function registration(login: string, password: string)
{
    const response = await FetchData("", "/users/registration", {"login": login, "password": password});

    return response;
}

export async function tokencheck(token: string)
{
    const response = await FetchData(token, "/users/tokencheck", {});

    return response;
}