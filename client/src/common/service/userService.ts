import FetchData from "./dataFetchService";

export async function loginCheck(login: string, password: string)
{
    const response = await FetchData(true, "", "/users/loginCheck", {"login": login, "password": password});

    return response;
}

export async function registration(login: string, password: string)
{
    const response = await FetchData(true, "", "/users/registration", {"login": login, "password": password});

    return response;
}

export async function tokencheck(token: string)
{
    const response = await FetchData(true, token, "/users/tokencheck", {});

    return response;
}