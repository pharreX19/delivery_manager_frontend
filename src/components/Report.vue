<template>
  <div class="min-h-screen min-w-full bg-blue-900">
    <div class="py-3 px-5">
      <h3 class="text-lg font-medium text-white text-center">Overall Summary</h3>

      <div class="mt-3 px-3 overflow-scroll min-h-screen" v-show="orders">
        <table class="text-white w-full text-center whitespace-no-wrap">
        <thead>
          <tr class="font-sans font-medium">
            <th class="py-5">#</th>
            <th><customer-name-filter :name="filtered_name == '' ? 'Customer Name' : filtered_name" @selected_filter_name="selected_filter_name"/></th>
            <th><customer-name-filter :name="filtered_contact_no == '' ? 'Contact No.' : filtered_contact_no" @selected_filter_name="selected_filter_contact_no"/></th>
            <th>Address</th>
            <th>Ordered Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th><status-drop-down-select :status="filtered_status" @selected_filter_status="selected_filter_status"/></th>
            <th>Date</th>
            <th>Last update</th>
          </tr>
          
        </thead>
        <tbody v-for="(order, pindex) in orders" :key="pindex" v-show="order.items.length > 0" >
          <tr class="border-b text-base font-thin font-sans" v-for="(item, index) in order.items" :key="index" @click="view_order(order.id)">
              <td class="py-4 pr-3">{{ pindex + 1 }}</td>
              <td class="px-5">{{ order.order_customer.customer.name }}</td>
              <td class="px-5">{{ order.order_customer.customer.contact_no }}</td>
              <td class="px-5">{{ order.order_address.address.building }} - {{ order.order_address.address.road }}</td>
              <td class="px-5">{{ item.name }} - {{ item.code }}</td>
              <td class="px-5">{{ item.pivot.quantity }}</td>
              <td class="px-5">{{ item.pivot.price }}</td>
              <td class="px-5">{{ order.status.status }}</td>
              <td class="px-5">{{ order.created_at }}</td>
              <td class="px-5">{{ order.updated_at }}</td>
            </tr>
        </tbody>
      </table>
      </div>
    </div>
    <div class="flex justify-center items-center pb-3 pt-5">
      <div v-for="(page,index) in total_pages" :key="index" v-show="total_pages > 1">
        <pagination :page_number = "page" @emit_clicked_page="(page_number) => clicked_page(page_number)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Pagination from '../components/Report/pagination.vue'
import StatusDropDownSelect from '../components/Report/StatusDropDownSelect.vue'
import CustomerNameFilter from '../components/Report/CustomerNameFilter.vue'
import router from '../router';
export default {
  name: "Report",
  components: {
    StatusDropDownSelect,
    CustomerNameFilter,
    Pagination,

  },

  setup(props) {
    onMounted(() => {
      store.dispatch("getOrders");
    });

    const store = useStore();

    const filtered_status = ref('Status');
    let filtered_status_id;

    const filtered_name = ref('');
    const filtered_contact_no = ref('');


    const orders = computed(() => store.state.order.orders);

    const total_pages = computed(() => Math.ceil(store.state.order.total_pages) )

    const clicked_page = (page_number) => {
      store.dispatch("getOrders", {page: page_number, filtered_status: filtered_status_id});
    }

    const selected_filter_status = (status, status_id) => {
      filtered_status.value = status
      filtered_status_id = status_id

      store.dispatch("getOrders", {
        page: 1,
        filter_status: status_id,
        filter_name: filtered_name.value,
        filter_contact_no: filtered_contact_no.value

      });
      console.log(status_id);
      console.log(status)
    };

    const selected_filter_name = (name) => {
      filtered_name.value = name
      store.dispatch("getOrders", {
        page: 1,
        filter_status: filtered_status_id,
        filter_name: name,
        filter_contact_no: filtered_contact_no.value
      });
      console.log(name);
    };

    const selected_filter_contact_no = (contact_no) => {
      filtered_contact_no.value = contact_no
      store.dispatch("getOrders", {
        page: 1,
        filter_status: filtered_status_id,
        filter_name: filtered_name.value,
        filter_contact_no : contact_no
      });
      console.log(name);
    };

     const view_order = (order_id) => {
      router.push({ name: "job-details", params: { jobId: order_id } });
    };



    return {
      orders,
      // dropdown,
      total_pages,
      clicked_page,
      selected_filter_status,
      selected_filter_name,
      filtered_status,
      filtered_name,
      view_order,
      filtered_contact_no,
      selected_filter_contact_no
    };
  },
};
</script>

<style>
</style>