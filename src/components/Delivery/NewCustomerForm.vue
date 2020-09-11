<template>
  <div class="mt-3 px-3 py-4 bg-white rounded text-gray-700">
    <h4 class="pb-2 text-base font-light">Customer Details</h4>
    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="name">Name</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="name"
        id="name"
        maxlength="30"
        required

      />
    </div>

    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="contact_no">Contact</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="contact_no"
        id="contact_no"
        max="10"
        required
      />
    </div>

    <!-- <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="address_id">Address</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="address"
        id="address"
        maxlength="30"
        required
      />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "NewCustomerForm",
};
</script>

<style>
</style>