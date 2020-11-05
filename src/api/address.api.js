import httpClient from './httpClient'

const api_get_addresses = () => httpClient.get('http://localhost:8000/api/addresses');

const api_get_address = (id) => httpClient.get(`http://localhost:8000/api/addresses/${id}`);

const api_create_address = ({building, road, floor_no, island, country, customer_id}) => httpClient.post('http://localhost:8000/api/addresses', { building, road, floor_no, island, country, customer_id });

const api_update_address = (id, {building, road, floor_no, island, country}) => httpClient.patch(`http://localhost:8000/api/addresses/${id}`, { building, road, floor_no, island, country});

const api_delete_address = (id) => httpClient.delete(`http://localhost:8000/api/items/${id}`);

const api_create_address_customer = ({address_id, customer_id}) => httpClient.post(`http://localhost:8000/api/addresses-customers/`, { address_id, customer_id});


export {
    api_get_addresses,
    api_get_address,
    api_create_address,
    api_update_address,
    api_delete_address,
    api_create_address_customer
}