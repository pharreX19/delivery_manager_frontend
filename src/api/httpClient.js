import axios from 'axios'
import router from '../router/index'
import { useStore, mapState } from "vuex";

const httpClient = axios.create({
    baseUrl: 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
    }
});

httpClient.prototype.$http = httpClient

httpClient.interceptors.request.use(config => {
    const token = localStorage.getItem("access_token")
    if(token){
        console.log('HERE IS THE TOKEN ' + token)
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log(config);
    return config;
}, error => {
    console.log('ERROR HAPPNED');
    return Promise.reject(error);
})


httpClient.interceptors.response.use(response => {
    if(response.status === 200 || response.status === 201){
        return Promise.resolve(response);
    }else{
        return Promise.reject(response)
    }
},
    error => {

    if(error.response.status){
        var serverErrors = [];
        switch(error.response.status){
            case 400:
                console.log('400 case')
                break

            case 401:
                const store = useStore();
                console.log(error.response.data.message)
                store.commit('SET_ERRORS', error.response.data.message)
                // commit('SET_ERRORS', error.response.data.message)
                router.replace({'path' : '/login'});
                break

            case 403:
                console.log('403 case')
                break

            case 404:
                console.log('404 case' + error)
                break

            case 422:
                serverErrors = error.response.data.errors ?? error.response.data.failure_message;
                break

            case 500:
            default:
                console.log(error);
                serverErrors = error.response.data.fail_message;
                break
        }
        return Promise.reject(serverErrors);
    }
})

// axios.interceptors.response.use((xhr) => {
//     switch (xhr.response.status){
//         case 422 : 
//             console.log("THIS IS 422 ERROR")
//             break;
//         case 404 : //Page not found
//             break;
//         case 500 : //Internal Server Error
//             break;
//     }
//     return Promise.reject(response);
// });

export default httpClient;