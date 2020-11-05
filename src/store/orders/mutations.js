import router from '../../router';
// import { state as rootState } from '../state'
import { state } from './state'

export const SET_PAGE_LOADING = (state, payload) => {
    state.is_loading = payload;
}

export const SET_ORDERS = (state, payload) => {
    state.orders = payload;
}

export const SET_ORDER = (state, payload) => {
    state.order = payload;
    console.log(state.order_complete_redirect);
    if(state.order_complete_redirect){
        router.push({ 'path' : '/jobs'})
      }
}

export const ADD_ITEM_ORDER = (state, payload) => {
    console.log('NEW ITEM ADDED')
    console.log(payload);
    
}

export const UPDATE_STATUS = (state, payload) => {
    console.log(state.orders);
    if(state.orders){
        state.orders.map((order) => {
            if(order.id === payload.id){
                order.status.status = payload.selected_value.key;
                order.status.id = payload.selected_value.value;
            }
        })
    }
    if(state.order){
        state.order.status.status = payload.selected_value.key;
        state.order.status.id = payload.selected_value.value;
    }
    console.log('CAME HERE AT LAST');
    // state.orders[payload.index].status.status = payload.selected_value.key;
    // state.orders[payload.index].status.id = payload.selected_value.value;
}

export const UPDATE_ORDER_STAFF = (state, payload) => {
    // state.orders.map((order) => {
    //     if(order.id === payload.id){
    //         assignee = {
    //             name : payload.selected_value.key,
    //             id : payload.selected_value.value

    //         }
    //     }
    // });
    if(state.order){
        console.log(state.order);
        state.order.assignee = {
            id : payload.selected_value.value,
            name : payload.selected_value.key,
        }
    }
    // state.orders[payload.index].assignee.name = payload.selected_value.key;
    // state.orders[payload.index].assignee.id = payload.selected_value.value;
}

// export const SET_CURRENT_ORDER = (state, payload) => {
    // state.currentOrderIndex = payload.index;
    // state.currentOrderId = payload.id
// }

// export const SEARCH_ORDER = ( state, payload ) => {
//     state.orders = payload.orders;
//     console.log(payload);
// }


export const SET_COMMENT = (state, payload) => {
    state.order.comments.unshift(payload);
}


export const SET_ORDER_COMPLETE_REDIRECT = (state, payload) => {
    state.order_complete_redirect = payload;
}

export const SET_TOTAL_PAGES = (state, payload) => {
    state.total_pages = payload.total / payload.per_page;
    
}
