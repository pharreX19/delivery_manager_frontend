<template>
  <div
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex items-center justify-center bg-opacity-50 bg-black"
  >
    <div class="relative mx-auto w-11/12 h-auto z-10">
      <div class="px-5 h-full text-sm bg-white w-full text-gray-700 rounded">
        <div class="flex flex-row-reverse pt-3 text-gray-700">
          <button class="px-1" @click="emit_show_modal">X</button>
        </div>
        <div class="py-5">
          <h3 class="pb-2 text-lg font-medium text-gray-700 text-center">Item Details</h3>

          <div class="mt-2">
            <label class="text-sm font-thin uppercase" for="name">Name</label>
            <input
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              maxlength="50"
              v-model="item.name"
              @input="resetErrors"
            />
            <p
              class="mt-1 text-xs italic text-red-500"
              v-for="error in errors.list[0].name"
              :key="error.index"
            >{{ error }}</p>
          </div>

          <div class="mt-2">
            <label class="text-sm font-thin uppercase" for="code">Code</label>
            <input
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="code"
              id="code"
              maxlength="30"
              v-model="item.code"
              @input="resetErrors"
            />
            <p
              class="mt-1 text-xs italic text-red-500"
              v-for="error in errors.list[1].code"
              :key="error.index"
            >{{ error }}</p>
          </div>

          <div class="mt-2">
            <label class="text-sm font-thin uppercase" for="description">Description</label>
            <textarea
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              name="description"
              id="description"
              maxlength="255"
              placeholder="Description"
              v-model="item.description"
              @input="resetErrors"
              readonly=true
            ></textarea>
            <p
              class="mt-1 text-xs italic text-red-500"
              v-for="error in errors.list[2].description"
              :key="error.index"
            >{{ error }}</p>
          </div>

          <div class="mt-3 flex">
            <button
              class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600"
              @click="emitSaveItem"
              v-if="!isUpdateRequest"
            >Save</button>
            <button
              class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600"
              @click="emitSaveItem"
              v-else
            >Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
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
    // showModal: {
    //   type: Boolean,
    //   required: true,
    //   default: true,
    // },
  },

  setup(props, {emit}){
    onMounted(() => {
      if (props.name) {
      isUpdateRequest.value = true;
      }
    })

    let isUpdateRequest = ref(false);

    const item = reactive({
        name: props.name,
        code: props.code,
        description: props.description,
      });

    const errors = reactive({
        list: [
          { name: [] }, 
          { code: [] }, 
          { description: [] }, 
          { error: "" }],
        }) 

    const emitSaveItem = () => {
      errors.list = [
        { name: [] },
        { code: [] },
        { description: [] },
        { error: "" },
      ];

      if (!item.name) {
        errors.list[0].name.push("Name is required");
      } else if (item.name.length > 50) {
        errors.list[0].name.push("Name should be less than 30 characters");
      }

      if (!item.code) {
        errors.list[1].code.push("Item code is required");
      } else if (item.code.length > 30) {
        errors.list[1].code.push("Item code should be less than 30 characters");
      }

      if (item.description && item.description.length > 255) {
        errors.list[2].description.push(
          "Country name should be less than 255 characters"
        );
      }

      if (
        errors.list[0].name.length === 0 &&
        errors.list[1].code.length === 0 &&
        errors.list[2].description.length === 0
      ) {
        if (!isUpdateRequest.value) {
          emit("saveItem", {
            item: item,
          });
        }else{
          emit("updateItem", {
          item: item,
        });
        }
      }
    };

    const resetErrors = (event) => {
      var fieldName = event.target.name;
      errors.list[0].error = "";

      switch (fieldName) {
        case "name":
          errors.list[0].name = [];
          break;

        case "code":
          errors.list[1].code = [];
          break;

        case "description":
          errors.list[2].description = [];
          break;
      }
    };

  const  emit_show_modal = () => {
      emit("show_modal");
    };

  return {
    isUpdateRequest,
    item, 
    errors,
    emitSaveItem,
    resetErrors,
    emit_show_modal
  }
  }
};
</script>

<style>
</style>