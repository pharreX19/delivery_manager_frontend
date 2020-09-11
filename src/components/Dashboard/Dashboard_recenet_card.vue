<template>
  <div class="text-gray-900">
    <div class="mt-3 px-3 py-3 bg-white rounded">
      <span
        class="px-2 rounded-full text-white uppercase text-xs font-bold bg-teal-400 inline-block"
      >{{status}}</span>

      <div class="flex items-center justify-between">
        <div class="mt-2 text-xs text-gray-800">
          <h5 class="font-bold">Order# {{ order}}</h5>
          <p>{{name}}</p>
          <p>MVR {{price}}</p>
        </div>

        <div class="mt-2">
          <div class="text-xs text-gray-800">
            <h5>{{address}}</h5>
            <p>{{island}}</p>
          </div>
        </div>
      </div>

      <div class="mt-2 flex justify-between">
        <div class="italic text-xs text-gray-500" v-show="show">
          <h6>
            {{staff}}
            <span class="block leading-none">{{time}}</span>
          </h6>
        </div>

        <div v-show="!show" class="flex justify-end">
          <div class="text-green-600 bg-white text-sm">
            <button class="px-2 py-1 border border-green-600 rounded" @click="emit_assign_task">Assign</button>
          </div>
        </div>

        <div class="px-2 py-1 ml-1 text-white bg-green-600 rounded text-sm">
          <button @click="view_task">View</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardRecentCard",
  props: {
    status: {
      type: String,
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    island: {
      type: String,
      required: true,
    },
    staff: {
      type: String,
      //   required: true
    },
    time: {
      type: String,
      //   required: true
    },
  },
  data: () => {
    return {
      show: true,
    };
  },
  created() {
    if (this.staff == undefined && this.time == undefined) {
      this.show = false;
    }
  },
  methods: {
    emit_assign_task() {
      this.$emit("assign_task", 1);
    },
    view_task() {
      this.$router.push({ name: "job-details", params: { jobId: 1 } });
    },

    // emit_view_task() {
    //   this.$emit("view_task", 1);
    // },
  },
};
</script>

<style>
</style>