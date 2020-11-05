import { Store } from "vuex";
import { createStore } from "vuex"
import { order } from './orders/index'
import { user } from './users/index'
import { customer } from './customers/index'
import { item } from './items/index'
import {address} from './address/index'
import {staff} from './staff/index'


const state = {
    count : 0,
    showCustomerForm: true,
    showAddressForm : false,
    showOrderForm: false,
    is_loading: false,
    errors: null

}

const getters = {

}

const mutations = {
    SHOW_CUSTOMER_FORM(state, payload){
        state.showCustomerForm = payload;
    },

    SHOW_ADDRESS_FORM(state, payload){
        state.showAddressForm = payload;
    },

    SHOW_ORDER_FORM(state, payload){
        state.showOrderForm = payload;
    },
    SET_LOADING(state, payload){
        state.is_loading = payload;
    },
    
    SET_ERRORS(state, payload){
        state.errors = payload;
    }
    
}

const actions = {

}

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {
        order,
        user,
        customer,
        address,
        item,
        staff
    },

});