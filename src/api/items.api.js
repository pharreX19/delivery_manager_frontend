import httpClient from './httpClient'

const api_get_items = (id=1) => httpClient.get(`http://localhost:8000/api/items?page=${id}`);

const api_create_item = ({name, code, description}) => httpClient.post('http://localhost:8000/api/items', { name, code, description});

const api_update_item = (id, {name, code, description}) => httpClient.patch(`http://localhost:8000/api/items/${id}`, { name, code, description});

const api_delete_item = (id) => httpClient.delete(`http://localhost:8000/api/items/${id}`);

const api_import_items = (file) => {
    const formData = new FormData();
    formData.append('select_file', file)
    return httpClient.post(`http://localhost:8000/api/import`, formData, {
        headers: {
            'Content-Type' : 'multiplart/form-data'
        }
    });
};


export {
    api_get_items,
    api_create_item,
    api_update_item,
    api_delete_item,
    api_import_items
}