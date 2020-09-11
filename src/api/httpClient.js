import axios from 'axios'

const httpClient = axios.create({
    baseUrl: process.env.VUE_APP_BASEURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
    }
});

export default httpClient;