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
          <h3 class="pb-2 text-lg font-medium text-gray-700 text-center">Item Details</h3>

          <div class="mt-2 flex items-center justify-between">
            <label class="text-sm font-thin uppercase" for="name">Name</label>
            <div class="ml-5 w-full">
              <input
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              maxlength="30"
              v-model="name"
            />
            <p class="mt-1 text-xs italic text-red-500">Please enter a name</p>
            </div>
          </div>

          <div class="mt-2 flex items-center justify-between">
            <label class="text-sm font-thin uppercase" for="code">Code</label>
            <div class="ml-5 w-full">
              <input
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="code"
              id="code"
              maxlength="30"
              v-model="code"
            />
            <p class="mt-1 text-xs italic text-red-500">Please enter a code</p>
            </div>
          </div>

          <div class="mt-2 flex items-center justify-between">
            <label class="text-sm font-thin uppercase" for="description">Description</label>
            <input
              class="ml-5 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="description"
              id="description"
              maxlength="255"
              placeholder="Description"
              v-model="description"
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
  name: "NewItemForm",
  props: {
    name: {
      type: String,
      required: false,
    },
    code: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
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