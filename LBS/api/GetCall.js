import { URL } from './Constants'

const GetCall = async (endpoint) => {

    const resp = await fetch(`${URL}${endpoint}`, {
        method: 'GET',
        headers:{
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    })
   
    if (resp.status === 200) {
        return await resp.json()
    } else {
        return null;
    }
}

export default GetCall