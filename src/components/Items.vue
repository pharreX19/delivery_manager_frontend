<template>
  <div class="min-h-screen bg-blue-900">
    <div class="py-3 px-5 text-white">
      <h3 class="text-lg font-medium text-white text-center">Item</h3>

            <new-item v-if="showNewItemForm" @show_modal="show_modal" :name="name" :code="code" />
            <delete-confirm v-if="showDeleteConfirm" @cancel="cancel" @delete_confirm="delete_confirm" />


      <div class="mt-3 flex">
        <button
          class="py-2 px-5 w-auto rounded shadow-lg text-white bg-green-600"
          @click="newItem"
        >New Item</button>
      </div>

      <div class="mt-3">
        <table class="table-auto font-sans text-sm font-light">
          <thead>
            <tr>
              <th class="border px-4 py-2">Item</th>
              <th class="border px-4 py-2">Code</th>
              <th class="border px-4 py-2">X</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-gray-100 hover:text-gray-700">
              <td class="border px-4 py-2 cursor-pointer" @click="edit_item">Intro to CSS</td>
              <td class="border px-4 py-2">Adam</td>
              <td class="border px-4 py-2 cursor-pointer" @click="delete_item">X</td>
            </tr>
            <tr class="hover:bg-gray-100 hover:text-gray-700">
              <td
                class="border px-4 py-2 cursor-pointer"
              >A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
              <td class="border px-4 py-2">Adam</td>
              <td class="border px-4 py-2 cursor-pointer">X</td>
            </tr>
            <tr class="hover:bg-gray-100 hover:text-gray-700">
              <td class="border px-4 py-2 cursor-pointer">Intro to JavaScript</td>
              <td class="border px-4 py-2">Chris</td>
              <td class="border px-4 py-2 cursor-pointer">X</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NewItem from '../components/Items/NewItemForm.vue';
import DeleteConfirm from '../components/DeleteConfirm.vue';

export default {
  name: "Items",
  components: {
    NewItem,
    DeleteConfirm
  },

  data() {
    return {
      showModal : true,
      showNewItemForm: false,
      showDeleteConfirm: false,
      name:'',
      code: ''
    };
  },
  methods: {
    newItem(){
          this.showNewItemForm = true;
      },
    show_modal(){
          this.showNewItemForm = false;
      },
      edit_item(event){
        this.name = 'Test Item';
        this.code = 'Test Code';
        this.showModal= true;
        this.showNewItemForm = true; 
      },
      delete_item(){
        this.showDeleteConfirm = true;
      },
      delete_confirm(){
        console.log('DELETEING');
      },
      cancel(){
        this.showDeleteConfirm = false;
      }
  },
};
</script>

<style>
</style>