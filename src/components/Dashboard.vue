<template>
  <div class="min-h-screen bg-blue-900 pb-3">
    <dashboard-card title="Delivered" subtitle="Items" :count="delivered_orders" color="bg-green-500"/>
    <dashboard-card title="Pending" subtitle="Items" :count="pending_orders" color="bg-yellow-500"/>
    <dashboard-card title="Cancelled" subtitle="Items" :count="cancelled_orders" color="bg-red-500"/>

    <!-- <p class="text-white">{{ staff_order }} {{ orders }}</p> -->

    <!-- <div class="mt-5 px-5 text-white">
      <p class="px-5 font-hairline">Recent Deliveries</p>
      <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" staff= "Ahmed Ismail" time="30 hours ago"/>
      <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" staff= "Ahmed Ismail" time="30 hours ago"/>
      <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" staff= "Ahmed Ismail" time="30 hours ago"/>
    </div>     -->

    <div>
    <div>
      <img src="../assets/logo.png" alt="user_avater" class="w-8 h-8">
    </div>
  </div>

  <button @click="getCounter">click me </button>
  </div>

  

  <!-- <h1>hello world{{ counter }} </h1> -->

</template>

<script>
// import DashboardRecentCard from '../components/Dashboard/Dashboard_recenet_card.vue'
import DashboardCard from '../components/Dashboard/Dashboard_card.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useStore } from "vuex"

export default {
  name: "Dashboard",
  components: {
    DashboardCard,
    // DashboardRecentCard
  },

  setup(props, context){

    onMounted(() => {
      store.dispatch('getOrders');
    })

    const store = useStore();
    
    let pending_orders = ref(null);
    let delivered_orders = ref(null);
    let cancelled_orders = ref(null);

    let staff_order = reactive({list:[]})

    // const count = computed(() => store.state.count); 

    const orders = computed(() => {
      set_order_count(store.state.order.orders);
      set_staff_order(store.state.order.orders)
      return store.state.order.orders;
    })

    const set_order_count = (orders) =>{
      orders.map((element) => {
        console.log(element);
        if(element.status.id == 1){
          pending_orders.value+=1;
        }else if(element.status.id == 2){
          delivered_orders.value+=1;
        }else{
          cancelled_orders.value+=1;
        }
      });
    }

    const set_staff_order = (orders) => {
      orders.map((element) => {
        if(staff_order.list.length == 0){
          staff_order.list.push({
            name: element.assignee?.name,
            pending: element.status_id == 1 ? 1 : 0,
            delivered: element.status_id == 2 ? 1 : 0 
          })
        }else{
          staff_order.list.map((order) => {
            if(order.name == element.assignee?.name){
              order.pending = element.status_id == 1 ? order.pending+1 : order.pending
              order.deliverd = element.status_id == 2 ? order.delivered+1 : order.delivered
            }else if(element.assignee != null){
              staff_order.list.push({
                name: element.assignee?.name,
                pending: element.status_id == 1 ? 1 : 0,
                delivered: element.status_id == 2 ? 1 : 0           
                })
            }
          })
        }
      })
    }
  

    return {
      orders,
      pending_orders,
      delivered_orders,
      cancelled_orders,
      staff_order
    }
  }
};
</script>

<style>
</style>