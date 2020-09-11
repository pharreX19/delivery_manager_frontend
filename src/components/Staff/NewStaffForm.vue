<template>
  <div
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex items-center justify-center bg-opacity-50 bg-black"
  >
    <div class="relative mx-auto w-11/12 h-auto z-50">
      <div class="px-5 h-full text-sm bg-white w-full text-gray-700 rounded">
        <div class="flex flex-row-reverse pt-3 text-gray-700">
          <button class="px-1" @click="emit_show_modal">X</button>
        </div>
        <div class="py-5">
          <h3 class="pb-2 text-lg font-medium text-gray-700 text-center">Staff Details</h3>

          <div class="mt-2 flex items-center justify-between">
            <label class="text-sm font-thin uppercase" for="name">Name</label>
            <div class="ml-2 w-full">
              <input
              class="w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              maxlength="30"
            />
            <p class="mt-1 text-xs italic text-red-500">Please enter a name</p>
            </div>
          </div>

          <div class="mt-2 flex items-center justify-between">
            <label class="text-sm font-thin uppercase" for="contact_no">Contact</label>
            <div class="ml-2 w-full">
              <input
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="contact_no"
              id="contact_no"
              maxlength="30"
            />
            <p class="mt-1 text-xs italic text-red-500">Please enter a contact number</p>
            </div>
          </div>

          <div class="mt-2 flex items-center justify-between">
            <label class="text-sm font-thin uppercase" for="country">Country</label>
            <input
              class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="country"
              id="country"
              maxlength="30"
              placeholder="Maldives"
            />
          </div>

          <div class="mt-2 flex items-center justify-between">
            <label class="text-sm font-thin uppercase" for="island">Date</label>
            <input
              class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="date"
              name="island"
              id="island"
              maxlength="30"
              v-model="today"
            />
          </div>

          <div class="mt-3 flex">
            <button
              class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600"
              @click="changeForm"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewStaffForm",
  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  data() {
    return {
      today: "2020-01-01",
    };
  },

  methods: {
    emit_show_modal() {
      this.$emit("show_modal");
    },
  },
};
</script>

<style>
</style>