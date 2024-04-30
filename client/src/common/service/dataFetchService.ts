import {serverip, serverport} from "../../../config";

export default async function dataFetch(needErrorAlert: boolean, token: string, route: string, data: { [key: string]: any; }) {
    let response: any = {};
    let responseErrorFlag = false;
    
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
            responseErrorFlag=true;
            throw new Error(errorResponse.message);
        }

        return response.json();
    }
    catch (error){
        console.log(error);
        if(needErrorAlert) alert(responseErrorFlag ?  error : "Не удалось получить ответ от сервера");
    }

    return response;
}