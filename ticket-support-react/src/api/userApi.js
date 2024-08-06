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

export async function addNewUser(token, email, name, access, password){
    try{
        const response = await fetch(`${API_ENDPONT}/users/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                email: email,
                name: name,
                access: access,
                password: password
            })
        });
        if(!response.ok) throw new Error('add new user api fails');
        return await response.json();
    }catch(error){
        console.error(error);
    }
}

export async function getUserList(token, access, query){
    try{
        const response = await fetch(`${API_ENDPONT}/users/${access}?search=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        if(!response.ok) throw new Error('get user list api failed');
        return await response.json();
    }catch(error){
        console.error(error);
    } 
}

export async function manualLogin(email, password){
    try{
        const response = await fetch(`${API_ENDPONT}/users/login2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if(!response.ok) throw new Error('login api failed');
        return await response.json();
    }catch(error){
        console.error(error);
    }
}

export async function editUser(token, email, name, password, access){
    try{
        const response = await fetch(`${API_ENDPONT}/users/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password,
                access: access
            })
        });
        if(!response.ok) throw new Error('user edit api failed');
        return await response.json();
    }catch(error){
        console.error(error);
    }
}