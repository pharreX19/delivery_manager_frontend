<template>
  <div class="min-h-screen bg-blue-900 pb-3">
    <dashboard-card title="Delivered" subtitle="Items" :count=10 color="bg-green-500"/>
    <dashboard-card title="Pending" subtitle="Items" :count=30 color="bg-yellow-500"/>
    <dashboard-card title="Cancelled" subtitle="Items" :count=5 color="bg-red-500"/>


    <div class="mt-5 px-5 text-white">
      <p class="px-5 font-hairline">Recent Deliveries</p>
      <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" staff= "Ahmed Ismail" time="30 hours ago"/>
      <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" staff= "Ahmed Ismail" time="30 hours ago"/>
      <dashboard-recent-card status="pending" order="001001" name="Trimmer" :price="1300" address="Beach Villa" island="Hulhumale" staff= "Ahmed Ismail" time="30 hours ago"/>
    </div>    
  </div>

</template>

<script>
import DashboardRecentCard from '../components/Dashboard/Dashboard_recenet_card.vue'
import DashboardCard from '../components/Dashboard/Dashboard_card.vue'

export default {
  name: "Dashboard",
  components: {
    DashboardCard,
    DashboardRecentCard
  }
};
</script>

<style>
</style>