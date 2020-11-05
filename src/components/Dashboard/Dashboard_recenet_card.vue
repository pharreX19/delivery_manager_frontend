<template>
  <div class="text-gray-900">
    <div class="mt-3 px-3 py-3 bg-white rounded">
      <div class="flex justify-between items-center">
        <div>
          <h5 class="font-bold text-base">Order# {{ order}}</h5>
        </div>
        <div>
          <p class="text-xs font-medium text-gray-900 text-right">{{customer_name}}</p>
          <p class="text-xs font-medium text-gray-900 text-right">{{customer_contact}}</p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-xs text-gray-800">
          <p>{{name}}</p>
          <p>MVR {{price}}</p>
        </div>

        <div class="mt-2 text-right">
          <div class="text-xs text-gray-800">
            <h5>
              {{address}} -
              <i>floor</i>
              : {{floor_no}}
            </h5>
            <p>{{road}}</p>
            <p>{{island}}</p>
          </div>
        </div>
      </div>

      <div class="mt-2 flex justify-between items-baseline">
        <!-- <div class="italic text-xs text-gray-500" v-show="show_view_button">
          <h6>
            {{staff}}
            <span class="block leading-none">{{time}}</span>
          </h6>
        </div>-->

        <div class="cursor-pointer" v-show="!is_status_loading">
          <span
            id="job_status"
            class="px-2 py-1 relative rounded-full text-white uppercase text-xs font-bold inline-block shadow-lg"
            :class="status_color"
            @click="show_status_drop_down"
          >{{status}}</span>
          <div class="mt-1 ml-16">
            <auto-select-drop-down
              yAxis="bottom-0"
              v-show="is_status_dropdown_visible"
              :data="statuses"
              @emit_drop_down_select="emit_drop_down_select_status"
            />
          </div>
        </div>
        <div>
          <pulse-loader size="7px" v-show="is_status_loading"></pulse-loader>
        </div>

        <div class="flex">
          <div>
            <div class="cursor-pointer" v-show="!is_assign_loading">
              <span
                class="px-2 py-1 relative rounded-full text-white uppercase text-xs font-bold inline-block shadow-lg whitespace-no-wrap"
                :class="staff ? 'bg-green-400' : 'bg-gray-400'"
                @click="show_assign_drop_down"
              >{{staff ?? 'Assign' }}</span>
              <div class="mt-1 ml-16 max-w-lg">
                <auto-select-drop-down
                  yAxis="bottom-0"
                  v-show="is_assign_dropdown_visible"
                  :data="staffs"
                  @emit_drop_down_select="emit_drop_down_select_assign"
                />
              </div>
            </div>

            <div>
              <pulse-loader size="7px" v-show="is_assign_loading"></pulse-loader>
            </div>
            <!-- v-show="!show_view_button" -->
            <!-- <div class="text-green-600 text-sm"> -->
            <!-- <button
              id="job_assign"
              class="px-2 py-1 rounded-full bg-gray-400 text-white uppercase text-xs font-bold inline-block shadow-lg"
              @click="show_assign_drop_down"
            >Assign</button>
            <div class="absolute mb-10 top-0">
              <auto-select-drop-down :data="statuses" yAxis="bottom-0" v-show="is_assign_dropdown_visible" />
            </div>-->
            <!-- </div> -->
          </div>

          <div  class="ml-2">
            <button v-show="show_view_button"
              class="px-2 py-1 rounded-full bg-gray-400 text-white text-center uppercase text-xs font-bold inline-block shadow-lg"
              @click="view_task"
            >view</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
// import AutoSelectDropDown from "../Jobs/AutoSelectDropDown.vue";
import router from "../../router";
import { useStore } from "vuex"
import { MutationTypes } from '../../store/orders/mutation_types';

export default {
  name: "DashboardRecentCard",
  components: {
    // AutoSelectDropDown,
  },
  setup(props, context) {
    const store = useStore();
    
    let status_color = ref(null);
    let is_status_loading = ref(false);
    let is_assign_loading = ref(false);

    const is_assigned = ref(false);
    const is_status_dropdown_visible = ref(false);
    const is_assign_dropdown_visible = ref(false);
    const statuses = [
      { key: "Pending", value: 1 },
      { key: "Delivered", value: 2 },
      { key: "Cancelled", value: 3 },
    ];

    const staffs = [
      { key: "Ali Ahmed", value: 1 },
      { key: "Riyaz", value: 2 },
      { key: "Ali", value: 3 },
    ];

    // const emit_assign_task = () => {
    //   $emit("assign_task", 1);
    // };

    const show_status_drop_down = () => {
      is_status_dropdown_visible.value = !is_status_dropdown_visible.value;
    };

    const show_assign_drop_down = () => {
      is_assign_dropdown_visible.value = !is_assign_dropdown_visible.value;
    };

    const view_task = () => {
      const index = context.attrs.index;
      const id = context.attrs.id;
      
      // store.commit(MutationTypes.SET_CURRENT_ORDER, { index: index, id: id });
      router.push({ name: "job-details", params: { jobId: id } });
    };

    const emit_drop_down_select_status = (selected_value) => {
      // console.log('Yahpp');
      // console.log(context.attrs.index);
      // console.log(context.attrs.id);
      // console.log("DROPPING DOWN");
      is_status_loading.value = true;
      is_status_dropdown_visible.value = false;
      // emit("emit_drop_down_select_status", selected_value);
      // const index = context.attrs.index ?? store.state.order.currentOrderIndex;
      const id = context.attrs.id;

      store.dispatch('updateOrderStatus', { selected_value, id})

    };

    const emit_drop_down_select_assign = (selected_value) => {
      is_assign_loading.value = true;
      is_assign_dropdown_visible.value = false;
      // const index = context.attrs.index ?? store.state.order.currentOrderIndex;
      const id = context.attrs.id;

      // console.log(index, id);
      
      store.dispatch('updateOrderStaff', { selected_value, id})
        // console.log(selected_value.value);
        
      // emit("emit_drop_down_select_assign", selected_value);
    };

    const hide_drop_down = () => {
      if (event.target.id != "job_assign" || event.target.id != "job_status") {
        // if(is_assign_dropdown_visible.value == true)
        // is_assign_dropdown_visible.value = false;
        // is_status_dropdown_visible.value = false;
      }
    };

    const set_status_color = () => {
      if(is_status_loading.value){
        is_status_loading.value = false;
      }
      
      if (props.status.toLowerCase() === "pending") {
        status_color.value = "bg-yellow-600";
      } else if (props.status.toLowerCase() === "delivered") {
        status_color.value = "bg-teal-600";
      } else {
        status_color.value = "bg-red-600";
      }
    };

    watch(
      () => props.status,
      (selection, prevSelection) => {
        set_status_color();
      }
    );

    watch(
      () => props.staff,
      (selection, prevSelection) => {
        if(is_assign_loading.value){
        is_assign_loading.value = false;
      }
      }
    )


    return {
      is_assigned,
      // emit_assign_task,
      view_task,
      is_status_dropdown_visible,
      show_status_drop_down,
      is_assign_dropdown_visible,
      show_assign_drop_down,
      emit_drop_down_select_assign,
      emit_drop_down_select_status,
      hide_drop_down,
      statuses,
      set_status_color,
      status_color,
      is_status_loading,
      is_assign_loading,
      staffs
    };
  },

  props: {
    show_view_button : {
      type: Boolean,
      required: true,
      default: true
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_contact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    road: {
      type: String,
      required: false,
    },
    floor_no: {
      type: String,
      required: false,
    },
    island: {
      type: String,
      required: true,
    },
    staff: {
      type: String,
      //   required: true
    },
    time: {
      type: String,
      //   required: true
    },
  },

  created() {
    if (this.staff) {
      this.is_assigned = true;
    }
    this.set_status_color();
  },
};
</script>

<style>
</style>