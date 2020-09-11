<template>
  <div class="min-h-screen bg-blue-900">
    <div class="py-3 px-5 text-white ">
      <h3 class="text-lg font-medium text-center">Admin panel</h3>
      <div class="mt-5 flex items-center justify-between">
        <input type="file" @change="file_selected" hidden ref="file_import" name="items" id="items">
        <button class="py-2 px-5 w-auto rounded shadow-lg text-white bg-green-600" @click="import_file">Import Item List</button>
        {{ imported_file_name }}
      </div>

      <div class="mt-5">
          <!-- <h3 class="py-2">Create New Item</h3> -->
        <button class="py-2 px-5 w-auto rounded shadow-lg text-white bg-green-600" @click="create_item">Add New Item</button>
      </div>

      <!-- <div class="mt-5"> -->
          <!-- <h3 class="py-2">Create New Staff</h3> -->
        <!-- <button class="py-2 px-5 w-auto rounded shadow-lg text-white bg-green-600">Create Staff</button> -->
      <!-- </div> -->

      <!-- <div class="mt-5"> -->
          <!-- <h3 class="py-2">Change User Password</h3> -->
        <!-- <button class="py-2 px-5 w-auto rounded shadow-lg text-white bg-green-600">Change Password</button> -->
      <!-- </div> -->
      
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPanel",
    data(){
        return{
            imported_file_name : '',
        }
    },
    methods: {
        import_file(){
            this.$refs.file_import.click();
        },
        file_selected(event){
            this.imported_file_name = event.target.value.split('\\')[2];
        }
    },
};
</script>

<style></style>