import {
  api_get_addresses,
  api_create_address,
  api_create_address_customer
} from '../../api/address.api'

import {
  MutationTypes
} from './mutation_types'

export const getAddresses = ({
  commit
}) => {
  commit(MutationTypes.SET_LOADING, true)
  api_get_addresses().then((response) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_ADDRESSES, response.data.data)
    console.log(response);
  }, (errors) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_ERRORS, errors)
  });
}


export const createAddress = ({
  commit
}, payload) => {
  api_create_address({building: payload.address.building, road : payload.address.road, floor_no : payload.address.floor_no, island : payload.address.island, country : 'Maldives', customer_id: payload.address.customer_id}).then((response) => {
    console.log(response);
    commit(MutationTypes.SET_ADDRESS_CUSTOMER, response.data.data)
    commit(MutationTypes.SET_ADDRESS, response.data.data)
    commit('SHOW_ADDRESS_FORM', false);
    commit('SHOW_ORDER_FORM', true);
    commit('SHOW_ORDER_FORM', true);
  }, (errors) => {
    console.log(errors);
    commit(MutationTypes.SET_ERRORS, errors)
  })
}

export const attachAddressCustomer = ({
  commit
}, payload) => {
  api_create_address_customer({ address_id : payload.address_id , customer_id : payload.customer_id }).then((response) => {
    console.log(response);
    commit(MutationTypes.SET_ADDRESS_CUSTOMER, response.data.data)
    commit('SHOW_ADDRESS_FORM', false);
    commit('SHOW_ORDER_FORM', true);
  }, (errors) => {
    console.log(errors);
    commit(MutationTypes.SET_ERRORS, errors)
  })
}
