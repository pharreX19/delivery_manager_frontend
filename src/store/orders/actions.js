import {
  api_get_orders,
  api_get_order,
  api_update_order,
  api_create_order,
  api_add_item_orders
  // api_search_order
} from '../../api/orders.api'

import {api_create_comment} from '../../api/comments.api'
import {
  MutationTypes
} from './mutation_types'
import { state } from '../address/state'
import router from '../../router'

export const getOrders = ({
  commit
}, payload) => {

  commit(MutationTypes.SET_LOADING, true)
  api_get_orders(payload?.page, payload?.filter_status, payload?.filter_name, payload?.filter_contact_no).then((response) => {
    commit(MutationTypes.SET_LOADING, false);
    console.log(response.data.data);
    commit(MutationTypes.SET_ORDERS, response.data.data)
    commit(MutationTypes.SET_TOTAL_PAGES, response.data.meta);
  }, (errors) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_ERRORS, errors)
  });
}

export const createOrder = ({
  commit
}, payload) => {
  console.log(payload.order.address_customer_id);
  commit(MutationTypes.SET_LOADING, true)
  api_create_order({item_id: payload.order.id, quantity: payload.order.quantity, price: payload.order.price, address_customer_id: payload.order.address_customer_id }).then((response) => {
    commit(MutationTypes.SET_LOADING, false);
    console.log(response.data.data);
    commit(MutationTypes.SET_ORDER, response.data.data)
    
    
  }, (errors) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_ERRORS, errors)
  });
}


export const addItemOrders = ({
  commit
}, payload) => {
  console.log(payload.order.address_customer_id);
  commit(MutationTypes.SET_LOADING, true)
  api_add_item_orders({item_id: payload.order.id, quantity: payload.order.quantity, price: payload.order.price, order_id: payload.order.order_id }).then((response) => {
    commit(MutationTypes.SET_LOADING, false);
    console.log(response.data.data);
    commit(MutationTypes.ADD_ITEM_ORDER, response.data.data)
    
    
  }, (errors) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_ERRORS, errors)
  });
}

export const updateOrderStatus = ({
  commit
}, payload) => {
  // console.log('STATUS UPDATNG' + payload.selected_value.value, payload.id, payload.index);
  console.log(payload);
  commit(MutationTypes.SET_LOADING, true)
  api_update_order(payload.id, { status_id: parseInt(payload.selected_value.value)}).then((response) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.UPDATE_STATUS, payload)
    commit(MutationTypes.UPDATE_CUSTOMER_ORDER_STATUS, payload)
  }, (errors) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.SET_ERRORS, errors);
  })
};


export const updateOrderStaff = ({
  commit
}, payload) => {
  commit(MutationTypes.SET_LOADING, true)
  api_update_order(payload.id, {staff_id: parseInt(payload.selected_value.value)}).then((response) => {
    commit(MutationTypes.SET_LOADING, false)
    commit(MutationTypes.UPDATE_ORDER_STAFF, payload)
    commit(MutationTypes.UPDATE_CUSTOMER_ORDER_STAFF, payload)

  }, (errors) => {
    commit(MutationTypes.SET_LOADING, false)
    console.log(errors);
    commit(MutationTypes.SET_ERRORS, errors)
  })
}

export const getOrder = ({
  commit
}, payload) => {
  commit(MutationTypes.SET_LOADING, true)
  api_get_order(payload.id).then((response) => {
    commit(MutationTypes.SET_LOADING, false)
    commit(MutationTypes.SET_ORDER, response.data.data)
  }, (errors) => {
    console.log(errors);
    commit(MutationTypes.SET_LOADING, false)
    commit(MutationTypes.SET_ERRORS, errors)
  })
}

// export const searchOrder = ({
//   commit
// }, payload) => {
//   api_search_order(payload.queryParam).then((response) => {
//     commit(MutationTypes.SEARCH_ORDER, response.data.data)
//   }, (errors) => {
//     console.log(errors);
//     commit(MutationTypes.SET_ERRORS, errors)
//   })
// }

export const submitComment = ({
  commit
}, payload) => {
  api_create_comment(payload.comment, payload.id).then((response) => {
    commit(MutationTypes.SET_COMMENT, response.data.data)
  }, (errors) => {
    console.log(errors);
    commit(MutationTypes.SET_ERRORS, errors)
  })
}