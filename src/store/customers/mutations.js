import { state as rootState } from '../state'
import { state } from './state'


export const SET_CUSTOMERS = (state, payload) => {
    state.customers = payload;
}

// export const SET_FILTERED_CUSTOMERS = (state, payload) => {
//     state.filteredCustomers = state.customers.filer((customer) => {
//         customer.name.toLowerCase().startsWith(payload.customer.name);
//     })
// }

export const SET_CUSTOMER = (state, payload) => {
    state.customer = payload;
    // state.selected_customer_id = payload.id
}

export const SET_SELECTED_CUSTOMER_ID = (state, payload) => {
    console.log('from mutation' +payload);
    state.selected_customer_id = payload.id;
}

export const UPDATE_CUSTOMER_ORDER_STATUS = (state, payload) => {
    // console.log(payload);
    state.customers.map((customer) => {
        customer.orders.map((order) => {
            if(order.id == payload.id){
                order.status.id = payload.selected_value.value;
                order.status.status = payload.selected_value.key;
            }
        })
    })
    // console.log(payload);
    console.log(state.customers);
}

export const UPDATE_CUSTOMER_ORDER_STAFF = (state, payload) => {
    // console.log(order.assignee);
    state.customers.map((customer) => {
        customer.orders.map((order) => {
            if(order.id == payload.id){
                // console.log(order.assignee['id'])
                order.assignee = {
                    id : payload.selected_value.value,
                    name : payload.selected_value.key
                };
                
            }
        })
    })
    // console.log(payload);
    console.log(state.customers);
}


