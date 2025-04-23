import axios from "axios";

export const api = async () => {
    try {
        const response = fetch('https://economia.awesomeapi.com.br/json/all')

        .then(resp => resp.json())
        .catch(err => console.error(err))
        return response
    } catch (error) {
        
    }
}