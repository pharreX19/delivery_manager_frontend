import httpClient from './httpClient'
const END_POINT = '/auth/';

const login = (name, password) => httpClient.post(END_POINT + 'login', {name, password});

const createUser = () => httpClient.post(END_POINT);

const updateUser = (id, name=null, password, confirmPassword) => httpClient.patch(END_POINT, {name, password, confirmPassword})

export {
    login
}