<template>
<!-- class="min-h-screen bg-blue-900 z-50" -->
  <div>
    <div class="py-3 px-5">
      <h3 class="text-lg font-medium text-white text-center">Create New Delivery</h3>
      <new-customer-form v-show="showCustomerForm" @saveCustomer="saveCustomer" />
      <new-address-form v-show="showAddressForm" @saveAddress="saveAddress" />
      <new-order-form v-show="showOrderForm" @saveOrder="saveOrder" @completeOrder="completeOrder" />
      <loader v-show="is_loading" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import NewAddressForm from "./Delivery/NewAddressForm.vue";
import NewCustomerForm from "./Delivery/NewCustomerForm.vue";
import NewOrderForm from "./Delivery/NewOrderFrom.vue";
import { api_create_customer } from "../api/customers.api.js";
import { api_create_address } from "../api/address.api.js";
import { api_create_order } from "../api/orders.api.js";
import { useStore, mapState } from "vuex";
import Loader from "./Loader.vue";
import router from "../router";

export default {
  name: "Delivery",
  components: {
    NewAddressForm,
    NewCustomerForm,
    NewOrderForm,
    Loader,
  },

  setup() {
    const store = useStore();
    const is_loading = ref(false);
    let new_customer_id;
    let new_address_id;
    let new_address_customer_id;
    let new_order_id;
    const customer = {
      name: "",
      contact_no: "",
    };

    const address = {
      block: "",
      road: "",
      floor_no: "0",
      island: "Male`",
      country: "Maldives",
    };

    const order = {
      code: "",
      name: "",
      quantity: 1,
      price: "",
    };

    let showCustomerForm = computed(() => store.state.showCustomerForm)
    let showAddressForm = computed(() => store.state.showAddressForm);
    let showOrderForm = computed(() => store.state.showOrderForm);

    let isNewOrder = true;

    new_address_customer_id = computed(() => {
      return store.state.address.address_customer_id;
      })

    const saveCustomer = (customerObject) => {
      // is_loading.value = true;
      if (customerObject.customer.id) {
        console.log(customerObject);
        // setTimeout(() => {
          // is_loading.value = false;
        // }, 1000);
        // console.log(customerObject.customer.id);
        // new_customer_id = customerObject.customer.id;
        // store.commit()
        // showAddressForm.value = true;
        // showCustomerForm.value = false;
        store.dispatch('updateCustomer', customerObject);
        // store.commit('SHOW_CUSTOMER_FORM', false);
        // store.commit('SHOW_ADDRESS_FORM', true);
        // store.commit('SET_SELECTED_CUSTOMER_ID', {id: customerObject.customer.id});
        // console.log('SELECTED  CUSTOMER ID: ' + store.state.customer.selected_customer_id);

      } else {
        // console.log(customerObject);
        store.dispatch('createCustomer', customerObject);
        console.log('THIS IS NEW CUSTOMER ID: ' + store.state.customer.customer);
      }
    };


    const saveAddress = (addressObject) => {
      // is_loading.value = true;
      console.log(addressObject.address);
      if (addressObject.address.id && addressObject.address.address_customer_id) {
        setTimeout(() => {
          is_loading.value = false;
        }, 1000);
        // new_address_id = addressObject.address.id;
        // new_address_customer_id = addressObject.address.address_customer_id;
        store.commit('SET_ADDRESS_CUSTOMER', {id: addressObject.address.address_customer_id});
        // console.log(addressObject);
        // showAddressForm.value = false;
        // showOrderForm.value = true;
        store.commit('SHOW_ADDRESS_FORM', false);
        store.commit('SHOW_ORDER_FORM', true);
      } else if(addressObject.address.id){
        console.log('NO ADDRESS ATTACHED')
          // new_address_id = addressObject.address.id;
          // addressObject.address.customer_id = store.state.customer.selected_customer_id;
          // console.log('THIS IS CUSTOMER ID' + store.state.customer.selected_customer_id);
  
          store.dispatch('attachAddressCustomer', { address_id: addressObject.address.id, customer_id: store.state.customer.selected_customer_id });
      }
      else {
        console.log(new_customer_id);
        addressObject.address.customer_id = store.state.customer.selected_customer_id;
        store.dispatch('createAddress', addressObject);
      }
    };

    const completeOrder = (orderObject) => {
      // orderObject.order.address_id = new_address_id;
      // orderObject.order.customer_id = new_customer_id;
      // console.log('COMPLETED ORDER');
            // console.log(store.state.address.address_customer_id);

      // console.log(orderObject);
      store.commit('SET_ORDER_COMPLETE_REDIRECT', true);
      saveOrder(orderObject);
        // router.replace({'path': '/jobs'});
        // })
    };

    const saveOrder = (orderObject) => {
       console.log(orderObject);
       console.log(store.state.address);
       orderObject.order.address_customer_id = store.state.address.address_customer;
       if(isNewOrder){
          store.dispatch('createOrder', orderObject);
          isNewOrder = false;
       }else{
          orderObject.order.order_id = store.state.order.order.id;
          store.dispatch('addItemOrders', orderObject);
       }
      // is_loading.value = true;
      // api_create_order(
      //   orderObject.order.id,
      //   orderObject.order.quantity,
      //   orderObject.order.price,
      //   new_customer_id,
      //   new_address_id
      // ).then(
      //   (response) => {
      //     console.log(response);
      //     is_loading.value = false;
      //     showOrderForm.value = true;
      //   },
      //   (errors) => {
      //     is_loading.value = false;
      //     console.log(errors);
      //   }
      // );
    };

    return {
      customer,
      address,
      order,
      showCustomerForm,
      showAddressForm,
      showOrderForm,
      saveCustomer,
      saveAddress,
      saveOrder,
      is_loading,
      completeOrder
    };
  },
};

// changeForm(){
//     if(this.showCustomerForm){

//         this.showAddressForm = true;
//         this.showCustomerForm = false;
//     }else{
//         this.showAddressForm = false;
//         this.showOrderForm = true;
//         this.buttonText = 'Save'
//     }
// }
// },
//   watch: {
//       isAddressCreated: function(val){
//           if(val){
//               this.showCustomerForm = val;
//               this.showAddressForm = !val;
//           }
//       },
//       isCustomerCreated: function(val){
//           if(val){
//               this.showOrderForm = val;
//               this.showCustomerForm = !val;
//               this.buttonText = 'Advance';
//           }
//       }
//   }
// };
</script>

<style>
</style>