import httpClient from './httpClient'
const END_POINT = '/users/';

const getAllUsers = () => httpClient.get(END_POINT)

const geUser = (user_id) => httpClient.get(END_POINT, {user_id});

const createUser = (name, password) => httpClient.post(END_POINT, {name, password});

const api_user_update = (id, name=null, password, password_confirmation, old_password) => httpClient.patch('http://localhost:8000/api/users', {name, password, password_confirmation, old_password})

export {
    api_user_update
}

