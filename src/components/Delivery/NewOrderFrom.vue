<template>
  <div class="mt-3 px-3 py-4 bg-white rounded text-gray-700">
    <h4 class="pb-2 text-base font-light">Order Details</h4>
    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="code">Code</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="code"
        id="code"
        maxlength="20"
        required
      />
    </div>

    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="item_name">Name</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="name"
        id="item_name"
        maxlength="30"
        required
      />
    </div>

    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="quantity">QTY</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="number"
        name="quantity"
        id="quantity"
        max="1000"
        min="1"
        placeholder="1"
      />
    </div>

    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="price">Price</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="number"
        name="price"
        id="price"
        min="1"
        max="9999999"
        placeholder="10.00"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NewOrderForm",
};
</script>

<style>
</style>