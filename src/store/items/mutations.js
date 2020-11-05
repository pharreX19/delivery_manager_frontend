import { state } from './state'

export const SET_ITEMS = (state, payload) => {
    state.items = payload;
    console.log(state.customers);
}

export const SET_ITEM = (state, payload) => {
    state.items.unshift(payload);
}

export const UPDATE_ITEM = (state, payload) => {
    state.items.map((item) => {
        if(item.id == payload.item.id){
            item.name = payload.item.name
            item.code = payload.item.code
            item.description = payload.item.description
        }
    })
}

export const DELETE_ITEM = (state, payload) => {
    state.items = state.items.filter(item => item.id != payload.id);
    
}


export const SET_TOTAL_PAGES = (state, payload) => {
    state.total_pages = payload.total / payload.per_page;
    
}