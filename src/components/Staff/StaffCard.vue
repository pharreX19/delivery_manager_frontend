<template>
  <div class="bg-white px-3 py-3 rounded shadow-lg">
    <div class="flex items-center">
      <div class="h-10 w-10 object-cover">
        <img src="../../assets/logo.png" alt="Staff Image" />
      </div>
      <div class="pl-10 text-gray-700 text-sm font-thin">
        <h3 class="font-medium">{{name}}</h3>
        <p>{{contact_no}}</p>
        <p>{{country}}</p>
        <p>
          Member since
          <span class="italic text-xs">{{joined_date}}</span>
        </p>
      </div>
    </div>
    <div class="mt-2 flex flex-row-reverse">
      <button class="px-2 py-1 bg-red-500 text-xs rounded" @click="emit_staff_delete">Delete</button>
      <button class="mr-1 px-2 py-1 bg-teal-500 text-xs rounded" @click="emit_staff_edit">Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StaffCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    joined_date: {
      type: Date,
      required: true,
    },
    // data: {
    //   return {

    //   }
    // }
  },

  methods:{
    emit_staff_delete(){
      this.$emit('staff_delete');
    },
    emit_staff_edit(){
      this.$emit('staff_edit');
    }
  }
};
</script>

<style>
</style>