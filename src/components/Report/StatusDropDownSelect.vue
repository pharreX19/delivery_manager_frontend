<template>
  <div class="relative">
    <button
      class="p-2 w-full text-white rounded-md font-bold font-sans text-md"
      @click="isOpen = !isOpen"
    >{{ status }}</button>
    <button
      v-if="isOpen"
      @click="isOpen = !isOpen"
      tabindex="-1"
      class="fixed z-10 inset-0 bg-black opacity-25 h-full w-full cursor-default"
    ></button>
    <div
      v-if="isOpen"
      class="py-2 absolute mt-12 top-0 left-0 z-10 border border-green-600 cursor-pointer bg-white rounded-lg w-48 text-center"
    >
      <p v-for="(element, index) in statuses" :key="index"
        class="p-2 w-full text-green-600 hover:bg-green-600 hover:text-white"
        @click="emit_selected_filter_status(element.key, element.value)"
      >{{ element.key }}</p>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "StatusDropDownSelect",
  props: {
    order_id: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const statuses = [
      { key: "All", value: '' },
      { key: 'Pending', value: 1 },
      { key: 'Delivered', value: 2 },
      { key: 'Cancelled', value: 3 },
    ]

    const isOpen = ref(false);

    const emit_selected_filter_status = (status, status_id) => {
      emit('selected_filter_status',status, status_id)
      isOpen.value = false
    }

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
      emit_selected_filter_status
    };
  },
};
</script>

<style>
</style>