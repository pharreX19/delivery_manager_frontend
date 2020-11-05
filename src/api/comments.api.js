import httpClient from './httpClient'

// const api_get_addresses = () => httpClient.get('http://localhost:8000/api/addresses');

// const api_get_address = (id) => httpClient.get(`http://localhost:8000/api/addresses/${id}`);

const api_create_comment = (comment, order_id) => httpClient.post('http://localhost:8000/api/comments', { comment, order_id });

// const api_update_address = (id, building, road, floor_no, island, country) => httpClient.patch(`http://localhost:8000/api/addresses/${id}`, { building, road, floor_no, island, country});

// const api_delete_address = (id) => httpClient.delete(`http://localhost:8000/api/items/${id}`);

export {
    api_create_comment
}