<template>
  <div class="min-h-screen bg-blue-900">
    <div class="py-3 px-5 text-white">
      <h3 class="text-lg font-medium text-white text-center">Staff</h3>
      
      <new-staff v-if="showNewStaffForm" @show_modal="show_modal" :showModal="showModal" />
      <delete-confirm v-if="showDeleteConfirm" @cancel="cancel" @delete_confirm="delete_confirm" />


      <div class="mt-3 flex">
        <button class="py-2 px-5 w-auto rounded shadow-lg text-white bg-green-600" @click=newStaff>New Staff</button>
      </div>
      <div class="mt-3">
        <staff-card
          name="Ibrahim Naseer"
          contact_no="+9607654321"
          country="Maldives"
          joined_date="20 October 2019"
          @staff_delete="staff_delete"
          @staff_edit="staff_edit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StaffCard from "../components/Staff/StaffCard.vue";
import NewStaff from '../components/Staff/NewStaffForm.vue'
import DeleteConfirm from '../components/DeleteConfirm.vue';

export default {
  name: "Staff",
  components: {
    StaffCard,
    NewStaff,
    DeleteConfirm
  },
  data(){
      return {
          showNewStaffForm : false,
          showDeleteConfirm: false
      }
  },
  methods: {
      newStaff(){
          this.showNewStaffForm = true
      },
      show_modal(){
          this.showNewStaffForm = false
      },
      staff_delete(){
        this.showDeleteConfirm = true;
      },
      delete_confirm(){
        console.log('DELETEING');
      },
      cancel(){
        this.showDeleteConfirm = false;
      },
      staff_edit(){
        this.showNewStaffForm=true;
      }
  }
}
</script>

<style>
</style>