<template>
  <div class="min-h-screen bg-blue-900">
      <div class="py-3 px-5">
             <h3 class="text-lg font-medium text-white text-center">Assign Deliveries</h3>
          <div class="mt-3 px-5 flex items-center justify-end">
              <div>
                  <button class="px-3 py-1">Search</button>
              </div>
              <div>
                  <button class="px-3 py-1">Filter</button>
              </div>
          </div>
          <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" @assign_task= "assign_task"/>
          <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" @assign_task= "assign_task"/>
          <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" @assign_task= "assign_task"/>
          <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" @assign_task= "assign_task"/>
      </div>
  </div>
</template>

<script>
import DashboardRecentCard from '../components/Dashboard/Dashboard_recenet_card.vue'
export default {
  name: "JobsCard",
  components: {
      DashboardRecentCard
  },
  props: {
      props: {
      status: {
          type: String,
          required: true
      },
      order : {
           type: String,
          required: true
      },
      name : {
           type: String,
          required: true
      },
      price : {
           type: Number,
          required: true
      },
      address : {
           type: String,
          required: true
      },
      island : {
           type: String,
          required: true
      },
      staff : {
           type: String,
          required: true
      },
      time : {
           type: String,
          required: true
      }
  }
},
    methods: {
        assign_task(){
            console.log('ASSIGNING TASKS');
        },
        
    }
}
</script>

<style>
</style>