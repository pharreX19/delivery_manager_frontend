import { state } from './state'

export const SET_ADDRESSES = (state, payload) => {
    state.addresses = payload;
}

export const SET_ADDRESS = (state, payload) => {
    state.address = payload;
    // state.address_customer_id = payload.id;
}

export const SET_ADDRESS_CUSTOMER = (state, payload) => {
    state.address_customer = payload.id;
    // state.selected_address_id = payload;
}

export const SET_SELECTED_ADDRESS_ID = (state, payload) => {
    state.selected_address_id = payload;
}

