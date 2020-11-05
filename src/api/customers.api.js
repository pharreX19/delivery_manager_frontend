import httpClient from './httpClient'

const api_get_customers = () => httpClient.get('http://localhost:8000/api/customers');

const api_get_customer = (id) => httpClient.get(`http://localhost:8000/api/customers/${id}`);

const api_create_customer = ({name, contact_no}) => httpClient.post('http://localhost:8000/api/customers', { name, contact_no});

const api_update_customer = (id, {name, contact_no}) => httpClient.patch(`http://localhost:8000/api/customers/${id}`, { name, contact_no});

const api_delete_customer = (id) => httpClient.delete(`http://localhost:8000/api/items/${id}`);

export {
    api_get_customers,
    api_get_customer,
    api_create_customer,
    api_update_customer,
    api_delete_customer
}