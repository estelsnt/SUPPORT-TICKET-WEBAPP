import config from '../../../config.json';
let API_ENDPONT = config.BACKEND_BASE_URL;

export async function login(tokendata){
    try{
        const response = await fetch(`${API_ENDPONT}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokendata)
        });
        if(!response.ok) throw new Error('error on login api');
        return await response.json();
    }catch(error){
        console.error(error);
    };
}

export async function verifyToken(token){
    try{
        const response = await fetch(`${API_ENDPONT}/users/verify`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`
            }
        });
        // will return status code 403 forbidden when token is not valid
        if (response.ok) {
            const data = await response.json();
            return { status: true, data: data };
        } else {
            return { status: false };
        }
    }catch(error){
        console.error(error);
        return {status: false};
    }
}