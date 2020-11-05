import httpClient from './httpClient'
const END_POINT = 'auth/';

const api_login_user = ({name, password}) => httpClient.post('http://localhost:8000/api/auth/login', {name, password});

const api_logout_user = () => httpClient.post('http://localhost:8000/api/auth/logout');

// const createUser = () => httpClient.post(END_POINT);

const api_update_user = ({password, password_confirmation, old_password}) => httpClient.patch(`http://localhost:8000/api/users/`, {password, password_confirmation, old_password})

export {
    api_login_user,
    api_update_user,
    api_logout_user
}