import {
  api_get_customers,
  api_create_customer,
  api_update_customer
} from '../../api/customers.api'

import {
  MutationTypes
} from './mutation_types'

export const getCustomers = ({
  commit
}) => {
  commit(MutationTypes.SET_LOADING, true)
  api_get_customers().then((response) => {
    console.log(response.data.data);
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_CUSTOMERS, response.data.data)
  }, (errors) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_ERRORS, errors)
  });
}


export const createCustomer = ({
  commit
}, payload) => {
  console.log(payload);
  commit(MutationTypes.SET_LOADING, true)
  api_create_customer({name: payload.customer.name, contact_no: payload.customer.contact_no}).then((response) => {
    commit(MutationTypes.SET_CUSTOMER, response.data.data)
    commit(MutationTypes.SET_SELECTED_CUSTOMER_ID, response.data.data)
    commit(MutationTypes.SHOW_CUSTOMER_FORM, false);
    commit(MutationTypes.SHOW_ADDRESS_FORM, true);
    commit(MutationTypes.SET_LOADING, false);

  }, (errors) => {
    console.log(errors);
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_ERRORS, errors)
  })
}

export const updateCustomer = ({
  commit
}, payload) => {
  console.log(payload);
  commit(MutationTypes.SET_LOADING, true)
  api_update_customer(payload.customer.id, {name: payload.customer.name, contact_no: payload.customer.contact_no}).then((response) => {
    commit(MutationTypes.SET_CUSTOMER, response.data.data)
    commit(MutationTypes.SET_SELECTED_CUSTOMER_ID, {id: payload.customer.id})
    commit(MutationTypes.SHOW_CUSTOMER_FORM, false);
    commit(MutationTypes.SHOW_ADDRESS_FORM, true);
    commit(MutationTypes.SET_LOADING, false);

  }, (errors) => {
    console.log(errors);
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_ERRORS, errors)
  })
}
