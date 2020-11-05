<template>
  <div>
    <div class="py-3 px-3">
      <h3 class="text-lg font-medium text-white text-center">Assign Deliveries</h3>
      <!-- <loader v-show="is_loading" loading_text_color="text-white" /> -->
           
      <div v-for="(customer, customer_index) in customers" :key="customer_index">
        <div
          class="my-2 py-6 px-4 bg-white text-gray-900 rounded-lg"
          v-show="customer.orders.length > 0"
        >
          <h3 class="font-bold">{{ customer.name }}</h3>
          <p class="font-medium">{{ customer.contact_no }}</p>

          <div v-for="(address, address_index) in customer.address" :key="address_index">
            <div class="mt-3 text-base" :class="address_index > 0 ? 'mt-10' : ''">
              <h3 class="font-medium">{{ address.building }}</h3>
              <p>{{ address.road }}</p>
              <p>{{ address.island }}</p>

              <div
                v-for="(order, index) in customer.orders"
                :key="index"
                v-show="address.pivot.id == order.address_customer_id"
              >
                <div
                  class="mt-10 flex justify-between items-center"
                 
                >
                  <h3 class="font-medium text-base">Orders</h3>

                  <button
                    class="w-8 h-8 font-medium text-base bg-blue-600 rounded-full text-white"
                     @click="toggleIsExpanded(order.id)"
                  >{{ isExpanded(order.id) ? '-' : '+' }}</button>
                </div>

                <div
                  class="mt-3 flex justify-between"
                  v-for="(item, index) in order.items"
                  :key="index"
                  v-show="isExpanded(order.id)"
                >
                  <p>{{ item.name }}</p>
                  <p>{{ item.code }}</p>
                  <p>{{ item.pivot.quantity }}</p>
                  <p>{{ item.pivot.price }}</p>
                </div>
                <div>
                  <div class="mt-3 text-white">
                    <!-- <button class="p-2 w-full bg-green-600 rounded-md">{{ order.status.status }}</button> -->
                     <drop-down-select :order_id="order.id" :status="order.status?.status"/>
                     <drop-down-select class="mt-1" :order_id="order.id" :status="order.assignee?.name ?? 'Assign'" :staffs="staffs"/>
                    <!-- <button class="mt-1 p-2 w-full bg-teal-400 rounded-md">{{ order.assignee?.name ?? 'Assign' }}</button> -->
                    <button class="mt-1 p-2 w-full text-gray-900 bg-gray-200 rounded-md" @click="view_order(order.id)">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- <div class="mt-3 flex items-center justify-start"> -->
      <!-- <div> -->
      <!-- <input v-model="queryParam" type="text" name="search" id="search" class="px-2 py-1" @input="search"> -->
      <!-- </div> -->
      <!-- <div> -->
      <!-- <button class="px-3 py-1">Filter</button> -->
      <!-- <auto-select-drop-down/> -->
      <!-- </div> -->
      <!-- </div> -->
      <!-- <div>
        <div
          class="my-2 py-6 px-4 bg-white text-gray-900 rounded-lg"
          v-for="(customer, customer_index) in customers"
          :key="customer_index"
        >
          <div class="text-left">
            <h3 class="font-medium">{{ customer.name }}</h3>
            <p>{{ customer.contact_no }}</p>
          </div>
          <div v-for="(address, address_index) in customer.address" :key="address_index">
            <div class="mt-3 text-base" :class="address_index > 0 ? 'mt-10' : ''" v-show="address.orders.length > 0"> 
              <h3 class="font-medium">{{ address.building }}</h3>
              <p>{{ address.road }}</p>
              <p>{{ address.island }}</p>
            </div>
            <div
              class="flex justify-between items-center"
              v-show="address.orders.length > 0"
              @click="toggleIsExpanded(customer_index, address_index)"
            >
              <h3 class="mt-4 font-medium text-base">Orders</h3>
              
              <button
                class="w-8 h-8 font-medium text-base bg-blue-600 rounded-full text-white"
                @click="expandIcon = !expandIcon"
              >{{expandIcon ? '-' : '+'}}</button>
            </div>
          
            <div v-show="address.orders.length > 0 && isExpanded(customer_index, address_index)">
              <div
                class="mt-1 flex justify-between text-base font-light"
                v-for="(order, index) in address.orders"
                :key="index"
              >
                <p>{{ order.item.name }}</p>
                <p>{{ order.item.code }}</p>
                <p>{{ order.quantity }}</p>
                <p>{{ order.price }}</p>
              </div>
            </div>
             <div class="mt-3 text-white" v-show="address.orders.length > 0">
            <button class="p-2 w-full bg-green-600 rounded-md">Status</button>
            <button class="mt-1 p-2 w-full bg-green-600 rounded-md">Assign</button>
            <button class="mt-1 p-2 w-full bg-green-600 rounded-md" @click="view_order(index)">View</button>
           </div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import DashboardRecentCard from "../components/Dashboard/Dashboard_recenet_card.vue";
import { api_get_orders, api_update_order } from "../api/orders.api.js";
import DropDownSelect from "./Jobs/DropDownSelect.vue";
import Loader from "../components/Loader.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore, mapState } from "vuex";
import router from "../router";
export default {
  name: "JobsCard",
  components: {
    DashboardRecentCard,
    Loader,
    DropDownSelect,
  },
  //   props: {
  //       status: {
  //           type: String,
  //           required: true
  //       },
  //       order : {
  //            type: String,
  //           required: true
  //       },
  //       name : {
  //            type: String,
  //           required: true
  //       },
  //       price : {
  //            type: Number,
  //           required: true
  //       },
  //       address : {
  //            type: String,
  //           required: true
  //       },
  //       island : {
  //            type: String,
  //           required: true
  //       },
  //       staff : {
  //            type: String,
  //           required: true
  //       },
  //       time : {
  //            type: String,
  //           required: true
  //       }
  //   },

  setup(props, { emit }) {
    const queryParam = ref("");
    const is_loading = ref(false);
    // let jobs = reactive({ list: [] });
    const store = useStore();

    let expandedIndexes = reactive({ list: [] });

    let isExpanded = (orderId) => {
      // return true;
      console.log(expandedIndexes.list);
      if (
        expandedIndexes.list.findIndex(
          (element) => element == orderId
          // customer_index && element.value == address_index
        ) >= 0
      ) {
        return true;
      } else {
        return false;
      }
    };

    let expandIcon = ref(false);

    onMounted(() => {
      store.dispatch("getCustomers");
    });

     onMounted(() => {
      store.dispatch('getStaffs');
    })

    const staffs = computed(() => {
      // console.log(store.state.staff.staffs)
      return store.state.staff.staffs
    })

    // const statuses = [
    //   { key: 'Pending', value: 1 },
    //   { key: 'Delivered', value: 2 },
    //   { key: 'Cancelled', value: 3 },
    // ]

    const expand_orders = ref(false);

    const customers = computed(() => store.state.customer.customers);

    const toggleIsExpanded = (orderId) => {
      const expandedIndex = expandedIndexes.list.findIndex(
        (element) => element == orderId
        // && element.value == address_index
      );
      console.log(expandedIndex);
      if (expandedIndex >= 0) {
        expandedIndexes.list.splice(expandedIndex, 1);
      } else {
        expandedIndexes.list.push(
          orderId
          // {
          // key: customer_index,
          // value: address_index,
          // }
        );
      }
      // isExpanded.value = !isExpanded.value
      // console.log(index);
    };

    const view_order = (order_id) => {
      router.push({ name: "job-details", params: { jobId: order_id } });
    };

    // const search = () => {
    //   console.log(queryParam.value);
    //   if(queryParam.value){
    //     store.dispatch('searchOrder', { queryParam : event.target.value });
    //   }else{
    //     store.dispatch('getOrders');
    //   }
    // }

    // const drop_down_selected_status = (index, job, selected_value) => {
    //     console.log(selected_value.value);
    //     api_update_order(job.id, parseInt(selected_value.value)).then((response) => {
    //         console.log(response);
    //         jobs.list[index].status.status = selected_value.key;
    //         jobs.list[index].status.id = selected_value.value;
    //         console.log(jobs.list[index]);
    //     }, (errors) => {
    //         console.log(errors);
    //     })
    // };

    //  const drop_down_seletced_assign = (index, job, selected_value) => {
    //     console.log(selected_value.value);
    //     api_update_order({id: job.id , staff_id : parseInt(selected_value.value)}).then((response) => {
    //         console.log(response);
    //         jobs.list[index].assignee.name = selected_value.key;
    //         jobs.list[index].assignee.id = selected_value.value;
    //         console.log(jobs.list[index]);
    //     }, (errors) => {
    //         console.log(errors);
    //     })
    // };

    const assign_task = (order_id) => {
      console.log("ASSIGNING TASKS");
    };

    return {
      assign_task,
      // drop_down_selected_status,
      // drop_down_seletced_assign,
      is_loading,
      customers,
      store,
      isExpanded,
      toggleIsExpanded,
      expandIcon,
      view_order,
      // statuses,
      staffs
    };
  },

  // mounted: function () {
  // store.dispatch('getOrders');
  // this.is_loading = true;
  // api_get_orders().then(
  //   (response) => {
  //     this.is_loading = false;
  //     this.jobs.list = response.data.data;
  //     console.log(response.data.data);
  //   },
  //   (error) => console.log("ERRRIR")
  // );
  // },
};
</script>

<style>
</style>