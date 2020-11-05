<template>
  <div class="bg-white px-3 py-3 rounded shadow-lg">
    <div class="flex items-center">
      <div class="h-10 w-10 object-cover">
        <img src="../../assets/logo.png" alt="Staff Image" />
      </div>
      <div class="pl-10 text-gray-700 text-base font-thin">
        <h3 class="font-medium text-lg">{{name}}</h3>
        <p>{{contact_no}}</p>
        <p>{{country}}</p>
        <p>
          Member since
          <span class="italic text-md">{{ joined_at }}</span>
        </p>
      </div>
    </div>
    <div class="mt-3">
      <button class="p-2 w-full bg-red-600 text-base rounded-md" @click="emit_staff_delete">Delete</button>
      <button class="mt-1 p-2 w-full bg-teal-600 text-base rounded-md" @click="emit_staff_edit">Edit</button>
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
    joined_at: {
      type: String,
      required: false,
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