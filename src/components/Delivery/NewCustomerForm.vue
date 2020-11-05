<template>
  <div class="mt-3 px-3 py-4 bg-white rounded text-gray-700">
    <h4 class="pb-2 text-base font-light">Customer Details</h4>
    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="name">Name</label>
      <input
        class="px-3 w-full block text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="name"
        id="name"
        maxlength="30"
        required
        autocomplete="off"
        v-model="customer.name"
        @input="resetErrors"
      />

      <div
        v-show="filteredCustomers.list && filteredListModal"
        class="text-center absolute w-full left-0 px-8"
      >
        <ul
          v-for="(filteredCustomer, index) in filteredCustomers.list"
          :key="index"
          class="bg-gray-900 text-white"
        >
          <li
            @click="setCustomer(filteredCustomer)"
            class="py-3 cursor-pointer border-b"
          >{{ filteredCustomer }}</li>
        </ul>
      </div>
    </div>

    <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[0].name"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="contact_no">Contact</label>
      <input
        class="px-3 w-full block text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="contact_no"
        id="contact_no"
        max="10"
        required
        v-model="customer.contact_no"
        @input="resetErrors"
      />
    </div>
    <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[1].contact_no"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-3 flex">
      <button
        class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600"
        @click="emitSaveCustomer"
      >Advance</button>
    </div>

    <!-- <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="address_id">Address</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="address"
        id="address"
        maxlength="30"
        required
      />
    </div>-->
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore, mapState } from "vuex";
export default {
  name: "NewCustomerForm",

  setup(props, { emit }) {
    const store = useStore();

    onMounted(() => {
      store.dispatch("getCustomers");
      console.log(store.state)
    });

    const customer = reactive({
      id: "",
      name: "",
      contact_no: "",
    });

    const customers = computed(() => {
      return store.state.customer.customers;
    });
    

    const filteredCustomers = reactive({ list: [] });
    const filteredListModal = ref(false);
    const errors = reactive({
      list: [{ name: [] }, { contact_no: [] }, { error: "" }],
    });

    const emitSaveCustomer = () => {
      console.log(customers);
      errors.list = [{ name: [] }, { contact_no: [] }, { error: "" }];

      if (!customer.name) {
        errors.list[0].name.push("Name is required");
      } else if (!/^[a-zA-Z ]{5,30}$/.test(customer.name)) {
        errors.list[0].name.push(
          "Name should be 5 characters long and less than 255 characters"
        );
      }
      // else if (name.length > 255 || name.length < 3) {
      //
      // }

      if (!customer.contact_no) {
        errors.list[1].contact_no.push("Conatct Number is required");
      } else if (
        !/^[+-\d]{7,10}$/.test(customer.contact_no)
      ) {
        errors.list[1].contact_no.push(
          "Contact number should be 7 digits long and less than 10 digits"
        );
      }

      if (
        errors.list[0].name.length === 0 &&
        errors.list[1].contact_no.length === 0
      ) {
        // login(name, password).then(
        //   (response) => {
        //     localStorage.setItem('access_token', response.data.access_token.token);
        //     $router.replace({'path': '/'})
        //   }, (errors) => {
        //     errors = [
        //       { name: errors.response.data.errors?.name },
        //       { contact_no: errors.response.data.errors?.contact_no },
        //       { error: errors.response.data.failure_message },
        //     ]
        //   });
        emit("saveCustomer", {
          customer: customer,
        });
      }
    };

    const resetErrors = () => {
      var fieldName = event.target.name;
      errors.list[2].error = "";
      if (fieldName == "name") {
        errors.list[0].name = [];
         filterCustomerList();
      } else {
        errors.list[1].contact_no = [];
      }
     
    };

    const filterCustomerList = () => {
      filteredListModal.value = true;
      customer.id= null;
      if (!customer.name) {
        filteredCustomers.list = [];
      } else {
        filteredCustomers.list = customers.value.filter((element) => {
          return element.name
            .toLowerCase()
            .startsWith(customer.name.toLowerCase());
        });
      }
    };

    const setCustomer = (filteredCustomer) => {
      customer.id = filteredCustomer.id;
      customer.name = filteredCustomer.name;
      customer.contact_no = filteredCustomer.contact_no;
      filteredListModal.value = false;
    };

    return {
      customer,
      customers,
      filteredCustomers,
      errors,
      emitSaveCustomer,
      resetErrors,
      setCustomer,
      filteredListModal,
    };
  },
};
</script>

<style>
</style>