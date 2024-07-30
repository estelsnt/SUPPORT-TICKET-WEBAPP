import config from '../../../config.json';
let API_ENDPONT = config.BACKEND_BASE_URL;

export async function test(){
    console.log(API_ENDPONT);
    return API_ENDPONT;
}
