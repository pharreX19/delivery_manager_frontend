<template>
  <div class="min-h-screen bg-blue-900">
    <div class="py-3 px-5">
      <h3 class="text-lg font-medium text-white text-center">Create New Delivery</h3>
      <new-customer-form v-show="showCustomerForm"/>
      <new-address-form v-show="showAddressForm" />
      <new-order-form v-show="showOrderForm" />
      <div class="mt-3 flex">
        <button class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600" @click="changeForm" >{{buttonText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import NewAddressForm from "./Delivery/NewAddressForm.vue";
import NewCustomerForm from "./Delivery/NewCustomerForm.vue";
import NewOrderForm from "./Delivery/NewOrderFrom.vue";

export default {
  name: "Delivery",
  components: {
    NewAddressForm,
    NewCustomerForm,
    NewOrderForm,
  },
  data: function(){
      return{
            showCustomerForm: true,
          showAddressForm: false,
          showOrderForm: false,
          buttonText: 'Advance'
      }
  },
  methods:{
      changeForm(){
          if(this.showCustomerForm){
              this.showAddressForm = true;
              this.showCustomerForm = false;
          }else{
              this.showAddressForm = false;
              this.showOrderForm = true;
              this.buttonText = 'Save'
          }
      }
  },
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
};
</script>

<style>
</style>