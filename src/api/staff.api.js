import httpClient from './httpClient'

const api_get_staffs = (id=1) => httpClient.get(`http://localhost:8000/api/staff?page=${id}`);

const api_get_staff = (id) => httpClient.get(`http://localhost:8000/api/staff/${id}`);


const api_create_staff = ({name, contact_no, country, joined_at}) => httpClient.post('http://localhost:8000/api/staff', { name, contact_no, country, joined_at });

const api_update_staff= (id, {name, contact_no, country, joined_at}) => httpClient.patch(`http://localhost:8000/api/staff/${id}`, { name, contact_no, country, joined_at });

const api_delete_staff = (id) => httpClient.delete(`http://localhost:8000/api/staff/${id}`);

export {
    api_get_staffs,
    api_get_staff,
    api_create_staff,
    api_update_staff,
    api_delete_staff
}