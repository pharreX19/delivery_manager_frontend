// import { state as rootState } from '../state'
import {state} from './state'
import router from '../../router/index';

export const LOGIN_USER = (state, payload) => {
    console.log(payload);
    localStorage.setItem('access_token', payload.data.access_token.token);
    router.replace({path: '/'});
}

export const LOGOUT_USER = (state, payload) => {
    console.log(payload);
    localStorage.removeItem('access_token');
    router.replace({path: '/login'});
}

export const UPDATE_USER = (state, payload) => {
    console.log(payload);
}

