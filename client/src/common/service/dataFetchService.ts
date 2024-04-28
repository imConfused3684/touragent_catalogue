import {serverip, serverport} from "../../../config";

export default async function dataFetch(token: string, route: string, data: { [key: string]: any; }) {
    let response: any = {};
    
    try{
        response = await fetch(`http://${serverip}:${serverport}${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Не удалось получить ответ от сервера");
        }

    }
    catch (error){
        alert(error);
    }

    return response.json();
}