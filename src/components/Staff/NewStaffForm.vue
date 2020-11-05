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
          <h3 class="pb-2 text-lg font-medium text-gray-700 text-center">Staff Details</h3>

          <div class="mt-2">
            <label class="text-sm font-thin uppercase" for="name">Name</label>
            <input
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              maxlength="30"
              v-model="staff.name"
              @input="resetErrors"
            />
            <p
              class="mt-1 text-xs italic text-red-500"
              v-for="error in errors.list[0].name"
              :key="error.index"
            >{{ error }}</p>
          </div>

          <div class="mt-2">
            <label class="text-sm font-thin uppercase" for="contact_no">Contact</label>
            <input
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="contact_no"
              id="contact_no"
              maxlength="30"
              v-model="staff.contact_no"
              @input="resetErrors"
            />
            <p
              class="mt-1 text-xs italic text-red-500"
              v-for="error in errors.list[1].contact_no"
              :key="error.index"
            >{{ error }}</p>
          </div>

          <div class="mt-2">
            <label class="text-sm font-thin uppercase" for="country">Country</label>
            <input
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="text"
              name="country"
              id="country"
              maxlength="30"
              v-model="staff.country"
              @input="resetErrors"
            />
            <p
              class="mt-1 text-xs italic text-red-500"
              v-for="error in errors.list[2].country"
              :key="error.index"
            >{{ error }}</p>
          </div>

          <div class="mt-2">
            <label class="text-sm font-thin uppercase" for="island">Date</label>
            <input
              class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
              type="date"
              name="island"
              id="island"
              maxlength="30"
              v-model="staff.joined_at"
              @input="resetErrors"
            />
          </div>

          <div class="mt-3 flex">
            <button
              class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600"
              @click="emitSaveStaff"
              v-if="!isUpdateRequest"
            >Save</button>
            <button
              class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600"
              @click="emitSaveStaff"
              v-else
            >Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, ref, watch} from 'vue'
export default {
  name: "NewStaffForm",

  props: {
    name: {
      type: String,
      required: false,
    },
    contact_no: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    joined_at: {
      type: String,
      required: false,
    },
  },

  setup(props, {emit}){
    const isUpdateRequest = ref(false);

    onMounted(()=> {
      console.log(props.name);
      if (props.name) {
        isUpdateRequest.value = true;
      }
    })

    let staff = reactive({
        name: props.name,
        contact_no: props.contact_no,
        country: props.country,
        joined_at: props.joined_at,
      });

    const errors = reactive({ 
      list: [
        { name: [] },
        { contact_no: [] },
        { country: [] },
        { joined_at: [] },
        { error: "" },
      ]
    });

    const emitSaveStaff = () => {
      errors.list = [
        { name: [] },
        { contact_no: [] },
        { country: [] },
        { joined_at: [] },
        { error: "" },
      ];

      if (!staff.name) {
        errors.list[0].name.push("Name is required");
      } else if (!/^[a-zA-Z\s ]{3,30}$/.test(staff.name)) {
        errors.list[0].name.push(
          "Name should be 3 characters long and less than 30 characters"
        );
      }

      if (!staff.contact_no) {
        errors.list[1].contact_no.push("Contact number is required");
      } else if (!/^[0-9]{7,20}$/.test(staff.contact_no)) {
        errors.list[1].contact_no.push(
          "Contact number should be greater than 7 and less than 20 digits"
        );
      }

      if (!staff.country) {
        errors.list[2].country.push("Country name is required");
      } else if (!/^[a-zA-Z ]{1,30}$/.test(staff.country)) {
        errors.list[2].country.push(
          "Country name should be less than 30 characters"
        );
      }

      if (
        errors.list[0].name.length === 0 &&
        errors.list[1].contact_no.length === 0 &&
        errors.list[2].country.length === 0 &&
        errors.list[3].joined_at.length === 0
      ) {
        
        if (!isUpdateRequest.value) {
          emit("staff_save", {
            staff: staff,
          });
        }else{
          emit("staff_update", {
          staff: staff,
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

        case "contact_no":
          errors.list[1].contact_no = [];
          break;

        case "country":
          errors.list[2].country = [];
          break;

        case "joined_at":
          errors.list[3].joined_at = [];
          break;
      }
    };

    const emit_show_modal = () => {
      emit('show_modal')
    };

    return {
      staff, 
      errors,
      emitSaveStaff,
      resetErrors,
      emit_show_modal,
      isUpdateRequest
    }
  },
};
</script>

<style>
</style>