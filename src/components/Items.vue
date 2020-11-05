<template>
 <!-- class="min-h-screen bg-blue-900" -->
  <div>
    <div class="py-3 px-5 text-white">
      <h3 class="text-lg font-medium text-white text-center">Item</h3>
      <loader v-show="is_loading" />
      <new-item
        v-if="showNewItemForm"
        @show_modal="show_modal"
        @saveItem="save_item"
        @updateItem="update_item"
        :name="item.name"
        :code="item.code"
      />

      <delete-confirm v-if="showDeleteConfirm" @cancel="cancel" @delete_confirm="delete_confirm" />

      <div class="mt-3 flex justify-between self-center">
        <button
          class="py-2 px-5 w-auto rounded shadow-lg text-white bg-green-600 self-center"
          @click="new_item"
        >New Item</button>

        <button v-show="show_file_upload_button"
          class="py-2 px-5 w-auto rounded shadow-lg text-white bg-green-600 self-center"
          @click="upload_items_list"
        >Upload</button>

        <label v-show="!show_file_upload_button" class="trigger py-2 px-5 rounded shadow-lg text-white bg-green-600 self-center">
          File Import
          <br />
          <input type="file" style="display: none" accept=".csv, .txt" @change="fileSelected"/>
        </label>
      </div>

        <div class="flex flex-row-reverse py-1">
          <span class="text-sm pr-2"> {{ selected_file_name }}</span>
        </div>

      <div class="mt-3">
        <table class="table-fixed font-sans text-sm font-light">
          <thead>
            <tr>
              <th class="border px-4 py-2 w-2/3">Item</th>
              <th class="border px-4 py-2">Code</th>
              <th class="border px-4 py-2">X</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover:bg-gray-100 hover:text-gray-700"
              v-for="(item, index) in items"
              :key="index"
            >
              <td
                class="border px-4 py-2 cursor-pointer"
                @click="edit_item(item, index)"
              >{{item.name}}</td>
              <td class="border px-4 py-2">{{item.code}}</td>
              <td class="border px-4 py-2 cursor-pointer" @click="delete_item(item)">X</td>
            </tr>
            <!-- <tr class="hover:bg-gray-100 hover:text-gray-700">
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
            </tr>-->
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-center items-center pb-3 pt-5" v-show="total_pages > 1">
      <div v-for="(page,index) in total_pages" :key="index">
        <pagination
          :page_number="page"
          @emit_clicked_page="(page_number) => clicked_page(page_number)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader.vue";
import NewItem from "../components/Items/NewItemForm.vue";
import DeleteConfirm from "../components/DeleteConfirm.vue";
import {
  api_create_item,
  api_delete_item,
  api_get_items,
  api_update_item,
} from "../api/items.api";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import Pagination from "../components/Report/pagination.vue";

export default {
  name: "Items",
  components: {
    NewItem,
    DeleteConfirm,
    Loader,
    Pagination,
  },

  setup() {
    onMounted(() => {
      store.dispatch("getItems");
    });

    const store = useStore();

    const items = computed(() => store.state.item.items);

    const total_pages = computed(() =>
      Math.ceil(store.state.staff.total_pages)
    );

    const item = {
      name: "",
      code: "",
      description: "",
    };

    const is_loading = ref(false);
    const showNewItemForm = ref(false);
    const showDeleteConfirm = ref(false);
    const show_file_upload_button = ref(false)
    let selected_file;
    // let showModal = ref(false);
    let selectedId;
    let selectedIndex;
    const selected_file_name = ref(null)


    const new_item = () => {
      item.name = "";
      item.code = "";
      item.description = "";
      showNewItemForm.value = true;
    };

    const show_modal = () => {
      showNewItemForm.value = false;
    };

    const save_item = (itemObject) => {
      // console.log(itemObject.item.name);
      showNewItemForm.value = false;
      // is_loading.value = true;
      store.dispatch("createItem", itemObject);
    };

    const edit_item = (selectedItem, index) => {
      item.name = selectedItem.name;
      item.code = selectedItem.code;
      item.description = selectedItem.description;
      selectedId = selectedItem.id;
      selectedIndex = index;
      showNewItemForm.value = true;
    };

    const update_item = (itemObject) => {
      // console.log('UPDATING');
      showNewItemForm.value = false;
      // is_loading.value = true;
      itemObject.item.id = selectedId;
      store.dispatch("updateItem", itemObject);
    };

    const delete_item = (item) => {
      selectedId = item.id;
      showDeleteConfirm.value = true;
      console.log(item);
    };

    const delete_confirm = () => {
      console.log("DELETEING");
      showDeleteConfirm.value = false;
      //  is_loading.value = true;
      store.dispatch("deleteItem", { id: selectedId });
    };

    const cancel = () => {
      showDeleteConfirm.value = false;
    };

    const fileSelected = () => {
      selected_file = event.target.files[0];
      selected_file_name.value = event.target.files[0].name;
      show_file_upload_button.value = true;
    };

    const upload_items_list = () => {
      store.dispatch('itemsListFileUplaod', selected_file);
    }

    return {
      item,
      items,
      is_loading,
      showNewItemForm,
      showDeleteConfirm,
      selectedId,
      new_item,
      show_modal,
      save_item,
      edit_item,
      update_item,
      delete_item,
      delete_confirm,
      cancel,
      total_pages,
      fileSelected,
      selected_file_name,
      show_file_upload_button,
      upload_items_list
    };
  },
};
</script>

<style>
</style>