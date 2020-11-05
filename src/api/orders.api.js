import httpClient from './httpClient'

const api_get_orders = (id=1, filter_status='', filter_name='', filter_contact_no='') => httpClient.get(`http://localhost:8000/api/orders?page=${id}&filter[status_id]=${filter_status}&filter[orderCustomer.customer.name]=${filter_name}&filter[orderCustomer.customer.contact_no]=${filter_contact_no}`);

const api_get_order = (id) => httpClient.get(`http://localhost:8000/api/orders/${id}`);

const api_create_order = ({item_id, quantity, price, address_customer_id}) => httpClient.post('http://localhost:8000/api/orders', { item_id, quantity, price, address_customer_id});

const api_update_order = (id, {status_id, item_id, quantity, price, address_customer_id, staff_id}) => httpClient.patch(`http://localhost:8000/api/orders/${id}`, { item_id, status_id, quantity, price,  staff_id, address_customer_id});

// const api_search_order = (queryParam) => httpClient.get(`http://localhost:8000/api/orders/search?search=${queryParam}`);

const api_add_item_orders = ({item_id, quantity, price, order_id}) => httpClient.post('http://localhost:8000/api/item-orders/',{ item_id, quantity, price, order_id });


const api_delete_order = (id) => httpClient.delete(`http://localhost:8000/api/orders/${id}`);

export {
    api_get_orders,
    api_get_order,
    api_create_order,
    api_update_order,
    api_delete_order,
    api_add_item_orders
    // api_search_order
}