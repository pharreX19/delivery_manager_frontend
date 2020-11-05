<template>
  <div class="min-h-screen bg-blue-900">
    <div class="py-3 px-5">
      <h3 class="text-lg font-medium text-white text-center">Delivery Details</h3>
      <div
          class="my-2 py-6 px-4 bg-white text-gray-900 rounded-lg"
        >
          <h3 class="font-bold">{{ order.order_customer?.customer.name }}</h3>
          <p class="font-medium">{{ order.order_customer?.customer.contact_no }}</p>

            <div class="mt-3 text-base" :class="address_index > 0 ? 'mt-10' : ''">
              <h3 class="font-medium"></h3>
              <p>{{ order.order_address?.address.building }}</p>
              <p>{{ order.order_address?.address.road }}</p>
              <p>{{ order.order_address?.address.island }}</p>
            </div>

            <div
              class="mt-10 flex justify-between items-center"
              @click="toggleIsExpanded(order.id)"
            >
              <h3 class="font-medium text-base">Orders</h3>
              
              <button
                class="w-8 h-8 font-medium text-base bg-blue-600 rounded-full text-white"
                @click="expandIcon = !expandIcon"
              >{{expandIcon && isExpanded(order.id) ? '-' : '+'}}</button>
            </div>

            <div class="mt-3 flex justify-between" v-for="(item, index) in order.items" :key="index" v-show="isExpanded(order.id)">
                <p>{{ item.name }}</p>
                <p>{{ item.code }}</p>
                <p>{{ item.pivot.quantity }}</p>
                <p>{{ item.pivot.price }}</p>
            </div>

            <div>
            <div class="mt-3 text-white">
            <!-- <button class="p-2 w-full bg-green-600 rounded-md">{{ order.status?.status }}</button> -->
            <drop-down-select :order_id="order.id" :status="order.status?.status"/>
            <drop-down-select class="mt-1" :order_id="order.id" :status="order.assignee?.name ?? 'Assign'" :staffs="staffs"/>

            <!-- <button class="mt-1 p-2 w-full bg-green-600 rounded-md">{{ order.assignee?.name ?? 'Assign' }}</button> -->
            <!-- <button class="mt-1 p-2 w-full text-gray-900 bg-gray-200 rounded-md" @click="view_order(order.id)">View</button> -->
            </div>
          </div>
        </div>

        <div class="mt-5">
        <h3 class="text-white text-base font-medium">Comments</h3>

        <div class="mt-2">
          <textarea
            class="px-2 py-2 text-base font-base bg-white text-gray-700 w-full rounded"
            placeholder="Your comment goes here..."
            cols="2"
            maxlength="255"
            v-model="comment"
          ></textarea>
          <p class="text-xs italic text-red-500" v-show="errors.comment_error">
            {{ errors.comment_error }}
            </p>

          <button class="mt-1 p-2 w-full bg-green-600 rounded-md text-white" @click='submit_comment'>
            <pulse-loader size="5px" color="white" v-show="is_loading"></pulse-loader>
            <span v-show="!is_loading">Submit</span>
            </button>
        </div>

        <div class="px-2 overflow-scroll my-8">
          <div class="mb-4" v-for="(comment, index) in order.comments" :key="index">
            <div class="text-white text-base">
              <p>{{ comment.comment }}</p>
              <small class="text-white font-hairline italic flex pt-1">{{ comment.created_at }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- <dashboard-recent-card
          :id="order.id"
          :customer_name="order.customer.name"
          :customer_contact="order.customer.contact_no"
          :status="order.status.status"
          :order="order.item?.code"
          :name="order.item?.name"
          :staff="order.assignee.name"
          :price="order.price"
          :address="order.order_address.address.building"
          :island="order.order_address.address?.island"
          :road="order.order_address.address?.road"
          :floor_no="order.order_address.address?.floor_no"
          :show_view_button ="false"
      />

      <div class="mt-5">
        <h3 class="text-white text-sm font-medium">Comments</h3>
        <div class="mt-2">
          <textarea
            class="px-2 py-2 text-xs font-thin bg-white text-gray-700 w-full rounded"
            placeholder="Your comment goes here..."
            cols="2"
            maxlength="255"
            v-model="comment"
          ></textarea>
          <p class="text-xs italic text-red-500" v-show="errors.comment_error">
            {{ errors.comment_error }}
            </p>

          <button class="mt-2 px-2 py-1 text-xs font-thin bg-green-600 text-white rounded" @click='submit_comment'>
            <pulse-loader size="5px" color="white" v-show="is_loading"></pulse-loader>
            <span v-show="!is_loading">Submit</span>
            </button>
        </div>

        <div class="px-2 overflow-scroll mt-5">
          <div class="mb-4"  v-for="(comment, index) in order.comments" :key="index">
            <div class="text-white font-thin text-xs">
              <p>{{ comment.comment }}</p>
              <small class="text-white font-hairline italic flex pt-1">20th august 2020</small>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import DashboardRecentCard from "../components/Dashboard/Dashboard_recenet_card.vue";
import { api_update_order } from '../api/orders.api.js';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import DropDownSelect from "./Jobs/DropDownSelect.vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
export default {
  name: "JobDetails",
  components: {
    DashboardRecentCard,
    DropDownSelect
  },
  setup(props, context){

      const is_loading = ref(false);
      const comment = ref('');
      const route = useRouter();
      const store = useStore();
      const errors = reactive({
        comment_error : ""
      })
    
      const expand_orders = ref(false);

      let expandedIndexes = reactive({ list: [] });

      // const statuses = [
      //     { key: 'Pending', value: 1 },
      //     { key: 'Delivered', value: 2 },
      //     { key: 'Cancelled', value: 3 },
      // ];

      onMounted(() => {
        const id = route.currentRoute._value.params.jobId;
        store.dispatch('getOrder', { id });
      });

       onMounted(() => {
      store.dispatch('getStaffs');
    })

    const staffs = computed(() => {
      // console.log(store.state.staff.staffs)
      return store.state.staff.staffs
    })

      const order = computed(() => {    
        return store.state.order.order;
      })

      const submit_comment = () => {
        errors.comment_error = "";

        if(!comment.value){
          errors.comment_error = "Please type your comment";
        }
        else if(comment.value.length < 5 || comment.value.length > 255){
          errors.comment_error = "Comment should be greater than 5 and less than 255 characters";
        }
        if(!errors.comment_error){
          is_loading.value = true;
          store.dispatch('submitComment', { comment: comment.value, id: route.currentRoute._value.params.jobId });
          comment.value = "";
          setTimeout(() => {
            is_loading.value = false
          }, 1500);
        }
      };

      let isExpanded = (orderId) => {
      console.log(expandedIndexes.list);
      if (
        expandedIndexes.list.findIndex(
          (element) =>
            element == orderId
        ) >= 0
      ) {
        return true;
      } else {
        return false;
      }
    };

      const toggleIsExpanded = (orderId) => {
      const expandedIndex = expandedIndexes.list.findIndex(
        (element) =>
          element == orderId 
      );
      console.log(expandedIndex);
      if (expandedIndex >= 0) {
        expandedIndexes.list.splice(expandedIndex, 1);
      } else {
        expandedIndexes.list.push(orderId
        );
      }
    };

      // const comments = computed(() => {
      //   var orders = store.state.order.orders;
      //   var index = store.state.order.currentOrderIndex;
      //   return orders[index].comments;
      // })

      // const Clicked = ()=>{
        // console.log(store.state.order);

      // }

    //   const emit_drop_down_select_assign = (selected_value) => {
    //     console.log(selected_value, index, job);
    //     api_update_order(job.id, null, null, null, null, null, null, parseInt(selected_value.value)).then((response) => {
    //         console.log(response);
    //         jobs.list[index].assignee.name = selected_value.key;
    //         jobs.list[index].assignee.id = selected_value.value;
    //         console.log(jobs.list[index]);
    //     }, (errors) => {
    //         console.log(errors);
    //     })
    // };
    return {
      // emit_drop_down_select_assign,
      // Clicked,
      order,
      submit_comment,
      comment,
      is_loading,
      errors,
      toggleIsExpanded,
      isExpanded,
      expand_orders,
      // statuses,
      staffs
    }
  }
};
</script>

<style>
</style>