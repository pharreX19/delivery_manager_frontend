<template>
  <div class="min-h-screen bg-blue-900">
    <div class="py-3 px-5">
      <h3 class="text-lg font-medium text-white text-center">Delivery Details</h3>
      <dashboard-recent-card
        status="pending"
        order="001001"
        name="Trimmer"
        :price="1300"
        address="Beach Villa"
        island="Hulhumale"
        staff="Ahmed Ismail"
        time="30 hours ago"
      />

      <div class="mt-5">
        <h3 class="text-white text-sm font-medium">Comments</h3>
        <div class="mt-2">
          <textarea
            class="px-2 py-2 text-xs font-thin bg-white text-gray-700 w-full rounded"
            placeholder="Your comment goes here..."
            cols="2"
            maxlength="255"
          ></textarea>
          <p class="mt-1 text-xs italic text-red-500">Please enter a password</p>

          <button class="px-2 py-1 text-xs font-thin bg-green-600 text-white rounded">Submit</button>
        </div>

        <div class="px-2 overflow-scroll mt-5">
          <div class="mb-5">
            <div class="text-white font-thin text-xs">
              <p>
                This is some commment which goes here in a dummy way This is some commment which goes here in a dummy way
                This is some commment which goes here in a dummy wayThis is some commment which goes here in a dummy way
              </p>
              <small class="text-white font-hairline italic flex flex-row-reverse">20th august 2020</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardRecentCard from "../components/Dashboard/Dashboard_recenet_card.vue";
export default {
  name: "JobDetails",
  components: {
    DashboardRecentCard,
  },
};
</script>

<style>
</style>