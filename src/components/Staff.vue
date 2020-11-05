<template>
 <!-- class="min-h-screen bg-blue-900" -->
  <div>
    <div class="py-3 px-5 text-white">
      <h3 class="text-lg font-medium text-white text-center">Staff</h3>
      <loader v-show="is_loading"/>

      <new-staff
        v-if="showNewStaffForm"
        @show_modal="show_modal"
        @staff_save="staff_save"
        @staff_update="staff_update"
        :name="staff.name"
        :contact_no="staff.contact_no"
        :country="staff.country"
        :joined_at="staff.joined_at"
      />
      <delete-confirm v-if="showDeleteConfirm" @cancel="cancel" @delete_confirm="delete_confirm" />

      <div class="mt-3 flex">
        <button
          class="py-2 px-5 w-auto rounded shadow-lg text-white bg-green-600"
          @click="staff_create"
        >New Staff</button>
      </div>
      <div class="mt-3" v-for="(staff, index) in staffs" :key="index">
        <staff-card
          :name="staff.name"
          :contact_no="staff.contact_no"
          :country="staff.country"
          :joined_at="staff.joined_at"
          @staff_delete="staff_delete(staff)"
          @staff_edit="staff_edit(staff, index)"
        />
      </div>
    </div>
    <div class="flex justify-center items-center pb-3 pt-5">
      <div v-for="(page,index) in total_pages" :key="index" v-show="total_pages > 1">
        <pagination :page_number = "page" @emit_clicked_page="(page_number) => clicked_page(page_number)"/>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue'
import StaffCard from "../components/Staff/StaffCard.vue";
import NewStaff from "../components/Staff/NewStaffForm.vue";
import DeleteConfirm from "../components/DeleteConfirm.vue";
import { computed, onMounted, reactive, ref } from "vue";
import {
  api_get_staffs,
  api_get_staff,
  // api_staff_create,
  // api_staff_update,
  // api_staff_delete,
} from "../api/staff.api.js";
import { store } from '../store_old';
import { useStore } from 'vuex';
import Pagination from '../components/Report/pagination.vue'

export default {
  name: "Staff",
  components: {
    StaffCard,
    NewStaff,
    DeleteConfirm,
    Loader,
    Pagination
  },
  setup() {

    onMounted(() => {
      store.dispatch('getStaffs');
    })

    const store = useStore();

    const staff = {
      name: "",
      contact_no: "",
      country: "",
      joined_at: "",
    };

    let selectedId;
    let selectedIndex;
    const staffs = computed(() => store.state.staff.staffs);

    const total_pages = computed(() => Math.ceil(store.state.staff.total_pages) )

    const is_loading = ref(false);
    const showNewStaffForm = ref(false);
    const showDeleteConfirm = ref(false);

    const show_modal = () => {
      showNewStaffForm.value = false;
    };

    const staff_create = () => {
      staff.name = "";
      staff.contact_no = "";
      staff.country = ""
      staff.joined_at = "";
      showNewStaffForm.value = true;
    };

    const staff_save = (staffObject) => {
      showNewStaffForm.value = false;
      store.dispatch('createStaff', staffObject);
      // is_loading.value = true;
      // api_staff_create(
      //   staffObject.staff.name,
      //   staffObject.staff.contact_no,
      //   staffObject.staff.country,
      //   staffObject.staff.joined_at
      // ).then(
      //   (response) => {
      //     console.log(response);
      //     staffs.list.push({
      //       name: staffObject.staff.name,
      //       contact_no: staffObject.staff.contact_no,
      //       country: staffObject.staff.country,
      //       joined_at: staffObject.staff.joined_at,
      //     });
      //     is_loading.value = false;
      //   },
      //   (errors) => {
      //     is_loading.value = false;
      //     console.log(errors)
      //   }
      // );
    };

    const staff_delete = (staff) => {
      selectedId = staff.id;
      showDeleteConfirm.value = true;
    };

    const staff_update = (staffObject) => {
      // console.log(staffObject);
        showNewStaffForm.value = false;
        // is_loading.value = true;
        staffObject.staff.id = selectedId;
        // staffObject.staff.index = selectedIndex;
        store.dispatch('updateStaff', staffObject);
    };

    const delete_confirm = () => {
        // console.log('DELETEING');
          showDeleteConfirm.value = false;
        //  is_loading.value = true;
        store.dispatch('deleteStaff', {id: selectedId});
      };

    const cancel = () => {
      showDeleteConfirm.value = false;
    };

    const staff_edit = (selectedStaff, index) => {
        staff.name = selectedStaff.name;
        staff.contact_no = selectedStaff.contact_no;
        staff.country = selectedStaff.country;
        staff.joined_at = selectedStaff.joined_at;
        selectedId = selectedStaff.id;
        selectedIndex = index;
        showNewStaffForm.value = true; 
    };

    const clicked_page = (page_number) => {
      store.dispatch("getStaffs", {page: page_number});
    }

    return {
      showNewStaffForm,
      showDeleteConfirm,
      show_modal,
      staff_create,
      staff_delete,
      delete_confirm,
      staff_save,
      cancel,
      staff_edit,
      staff_update,
      staff,
      staffs,
      is_loading,
      total_pages,
      clicked_page
      // selectedId,
      // selectedIndex
    };
  },
};
</script>

<style>
</style>