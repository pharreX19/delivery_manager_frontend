<template>
  <!-- <div class="relative z-10">
      <div class="bg-teal-400 w-auto h-auto rounded-md shadow-lg absolute" :class="yAxis">
          <div class="text-white text-sm text-center shadow-lg" v-for="(value, index) in data" :key="index">
            <h1 class="py-2 px-2 hover:bg-gray-100 hover:text-gray-900 whitespace-no-wrap" @click="select(value)">{{ value.key }}</h1>
          </div>
      </div>
  </div>-->
  <div class="relative">
    <button
      class="p-2 w-full text-white rounded-md shadow-xl"
      @click="isOpen = !isOpen"
      :class="status_color"
    >{{ status }}</button>
    <button
      v-if="isOpen"
      @click="isOpen = !isOpen"
      tabindex="-1"
      class="fixed z-10 inset-0 bg-black opacity-25 h-full w-full cursor-default"
    ></button>
    <div
      v-if="isOpen"
      class="py-2 absolute bottom-0 z-10 border border-green-600 cursor-pointer bg-white rounded-lg w-48 text-center"
    >
      <!-- <p
        class="p-2 w-full text-green-600 hover:bg-green-600 hover:text-white"
        @click="update_status('Pending',1)"
      >Pending</p>
      <p
        class="p-2 w-full text-green-600 hover:bg-green-600 hover:text-white"
        @click="update_status('Delivered', 2)"
      >Delivered</p> -->
      <p v-show="!staffs" v-for="(element, index) in statuses" :key="index"
        class="p-2 w-full text-green-600 hover:bg-green-600 hover:text-white"
        @click="update_status(element.key, element.value)"
      >{{ element.key }}</p>
      

      <p v-show="staffs" v-for="(staff, index) in staffs" :key="index"
        class="p-2 w-full text-green-600 hover:bg-green-600 hover:text-white"
        @click="update_staff(staff.name, staff.id)"
      >{{ staff.name }}</p>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "DropDownSelect",
  props: {
    order_id: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  // },

      staffs: {
          type: Array,
          required: false,
      },
  //     yAxis : {
  //         type: String,
  //         required: false,
  //         default: 'bottom-0'
  //     }
  },
  setup(props, { emit }) {
    const store = useStore();

    const statuses = [
      { key: 'Pending', value: 1 },
      { key: 'Delivered', value: 2 },
      { key: 'Cancelled', value: 3 },
    ]

    // const select = (selected_item) => {
    //     emit('emit_drop_down_select', selected_item);
    // };

    // onMounted(() => {
    //   store.dispatch('getStaffs');
    // })

    // const staffs = computed(() => {
    //   console.log(store.state.staff.staffs)
    //   return store.state.staff.staffs
    // })


    const isOpen = ref(false);

    let status_color = ref();

    const set_status_color = () => {
        console.log(props.status)
      if (props.status.toLowerCase() === "pending") {
        status_color.value = "bg-yellow-600";
      } else if (props.status.toLowerCase() === "delivered") {
        status_color.value = "bg-green-600";
      } else if (props.status.toLowerCase() === "cancelled")  {
        status_color.value = "bg-red-600";
      }else{
        status_color.value = "bg-teal-600";
      }
    };

    watch(
      () => props.status,
      (selection, prevSelection) => {
        set_status_color();
      }
    );

    // watch(() => props.data, 
    // (selection, prevSelection) => {
    //   if(!props.data){
    //     props.data = staffs
    //   }
    // });

    onMounted(() => {
        set_status_color();
    })
    
    const update_staff = (key, value) => {
      console.log(key, value);
      const selected_value = {
        key: key,
        value: value,
      };
      isOpen.value = false;
      store.dispatch("updateOrderStaff", {
        id: props.order_id,
        selected_value,
      });
    };

    const update_status = (key, value) => {
      const selected_value = {
        key: key,
        value: value,
      };
      isOpen.value = false;
      store.dispatch("updateOrderStatus", {
        id: props.order_id,
        selected_value,
      });
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
      // select,
      update_status,
      isOpen,
      status_color,
      // staffs,
      update_staff,
      statuses
      // status
    };
  },
};
</script>

<style>
</style>