<template>
  <div class="mt-3 px-3 py-4 bg-white rounded text-gray-700">
    <h4 class="pb-2 text-base font-light">Address Details</h4>
    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="block">Block</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="block"
        id="block"
        maxlength="30"
      />
    </div>

    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="road">Road</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="road"
        id="road"
        maxlength="30"

      />
    </div>

    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="floor">Floor</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="number"
        min="0"
        max="50"
        name="floor"
        id="floor"
        placeholder="1"
      />
    </div>

    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="island">Island</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="island"
        id="island"
        maxlength="30"
        placeholder="Male`"

      />
    </div>

    <div class="mt-2 flex items-center justify-between">
      <label class="text-sm font-thin uppercase" for="country">Country</label>
      <input
        class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text" value="Maldives" disabled
        name="country"
        id="country"        
        maxlength="30"

      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NewAddressForm",
};
</script>

<style>
</style>