<template>
  <div class="relative">
    <button
      class="p-2 w-full text-white rounded-md font-bold font-sans text-md"
      @click="isOpen = !isOpen"
    >{{ name }}</button>
    <button
      v-if="isOpen"
      @click="isOpen = !isOpen"
      tabindex="-1"
      class="fixed z-10 inset-0 bg-black opacity-25 h-full w-full cursor-default"
    ></button>
    <div
      v-if="isOpen"
      class="py-2 px-2 absolute mt-12 flex items-center top-0 left-0 z-10 border border-green-600 cursor-pointer bg-white rounded-lg w-64 text-center"
    >
      <input
        class="px-2 w-full text-sm py-2 text-gray-900 border border-gray rounded focus:shadow-outline"
        type="text"
        name="name"
        id="name"
        maxlength="30"
        v-model="filtered_name"
      />
      <svg
        class="w-6 h-6 ml-2 text-gray-700 cursor-pointer"
        @click="emit_selected_filter_name"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 487.95 487.95"
        style="enable-background:new 0 0 487.95 487.95;"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
            />
          </g>
        </g>
      </svg>

      <!-- <p v-for="(element, index) in statuses" :key="index"
        class="p-2 w-full text-green-600 hover:bg-green-600 hover:text-white"
        @click="emit_selected_filter_status(element.key, element.value)"
      >{{ element.key }}</p>-->
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "CustomerNameFilter",
  props: {
    // order_id: {
    //   type: Number,
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const statuses = [
      { key: "Pending", value: 1 },
      { key: "Delivered", value: 2 },
      { key: "Cancelled", value: 3 },
    ];

    const isOpen = ref(false);

    const filtered_name = ref("")

    const emit_selected_filter_name = () => {
      console.log(filtered_name.value)
      emit("selected_filter_name", filtered_name.value);
      isOpen.value = false;
    };

    const handleEscape = (e) => {
      if (e.key == "Esc" || e.key == "Escape") {
        isOpen.value = false;
      }
    };

    document.addEventListener("keydown", handleEscape);

    onBeforeUnmount(() => {
      document.removeEventListener("keydown", handleEscape);
    });

    return {
      isOpen,
      statuses,
      filtered_name,
      emit_selected_filter_name,
    };
  },
};
</script>

<style>
</style>