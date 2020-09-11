import httpClient from './httpClient'
const END_POINT = '/users/';

const getAllUsers = () => httpClient.get(END_POINT)

const geUser = (user_id) => httpClient.get(END_POINT, {user_id});

const createUser = (name, password) => httpClient.post(END_POINT, {name, password});

const updateUser = (id, name=null, password, confirmPassword) => httpClient.patch(END_POINT, {name, password, confirmPassword})

