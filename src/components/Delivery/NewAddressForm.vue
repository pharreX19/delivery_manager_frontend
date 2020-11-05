<template>
  <div class="mt-3 px-3 py-4 bg-white rounded text-gray-700">
    <h4 class="pb-2 text-base font-light">Address Details</h4>
    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="block">Building</label>
      <input
        class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="building"
        id="building"
        maxlength="50"
        v-model="address.building"
        autocomplete="off"
        @input="resetErrors"
      />
      <div
        v-show="filteredAddresses.list && filteredListModal"
        class="text-center absolute w-full left-0 px-8"
      >
        <ul
          v-for="(filteredAddress, index) in filteredAddresses.list"
          :key="index"
          class="bg-gray-900 text-white"
        >
          <li
            @click="setAddress(filteredAddress)"
            class="py-3 cursor-pointer border-b"
          >{{ filteredAddress }}</li>
        </ul>
      </div>
    </div>
    <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[3].building"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="road">Road</label>
      <input
        class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="road"
        id="road"
        maxlength="30"
        v-model="address.road"
        @input="resetErrors"
      />
    </div>
    <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[4].road"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="floor_no">Floor</label>
      <input
        class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="number"
        min="0"
        max="50"
        name="floor_no"
        id="floor_no"
        v-model="address.floor_no"
        @input="resetErrors"
      />
    </div>
    <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[0].floor_no"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="island">Island</label>
      <input
        class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="island"
        id="island"
        maxlength="30"
        v-model="address.island"
        @input="resetErrors"
      />
    </div>
    <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[1].island"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="country">Country</label>
      <input
        class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        readonly
        name="country"
        id="country"
        maxlength="30"
        v-model="address.country"
        @input="resetErrors"
      />
    </div>
    <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[2].country"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-3 flex">
      <button
        class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600"
        @click="emitSaveAddress"
      >Advance</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore, mapState } from "vuex";
export default {
  name: "NewAddressForm",

  setup(props, {emit}) {
    onMounted(() => {
      store.dispatch("getAddresses");
    });

    const addresses = computed(() => {
      return store.state.address.addresses;
    });

    const store = useStore();
    const address = reactive({
      address_customer_id : null,
      id: null,
      building: null,
      road: null,
      floor_no: 1,
      island: "Male",
      country: "Maldives",
    });

    const filteredAddresses = reactive({ list: [] });

    const filteredListModal = ref(false);

    const errors = reactive({
      list: [
        { floor_no: [] },
        { island: [] },
        { country: [] },
        { building: [] },
        { road: [] },
        { error: "" },
      ],
    });

    const emitSaveAddress = () => {
            console.log(address);

      errors.list = [
        { floor_no: [] },
        { island: [] },
        { country: [] },
        { building: [] },
        { road: [] },
        { error: "" },
      ];
    
      if (!address.building || !/^[a-zA-Z0-9 ]{1,30}$/.test(address.building)) {
        errors.list[3].building.push(
          "Building name is required and cannot contain special characters"
        );
      }

      if (address.road && !/^[a-zA-Z0-9 ]{1,30}$/.test(address.road)) {
        errors.list[4].road.push("Road name cannot contain special characters");
      }

      if (!address.floor_no) {
        errors.list[0].floor_no.push("Floor no is required");
      } else if (address.floor_no > 50 || address.floor_no < 0) {
        errors.list[0].floor_no.push(
          "Floor no should be greater than 0 and less than 50"
        );
      }

      if (!address.island) {
        errors.list[1].island.push("Island name is required");
      } else if (!/^[a-zA-Z ]{1,30}$/.test(address.island)) {
        errors.list[1].island.push(
          "Island name should be less than 30 characters"
        );
      }

      if (!address.country) {
        errors.list[2].country.push("Country name is required");
      } else if (address.country.length > 30) {
        errors.list[2].country.push(
          "Country name should be less than 30 characters"
        );
      }

      if (
        errors.list[0].floor_no.length === 0 &&
        errors.list[1].island.length === 0 &&
        errors.list[2].country.length === 0 &&
        errors.list[3].building.length === 0 &&
        errors.list[4].road.length === 0
      ) {
        // console.log('ERROR FREE');
        emit("saveAddress", {
          address: address,
        });
      }
    };

    const filterAddressessList = () => {
      console.log(address.building.toLowerCase());
      filteredListModal.value = true;
      if (!address.building) {
        filteredAddresses.list = [];
        address.id = null;
        address.address_customer_id = null;
      } else {
        filteredAddresses.list = addresses.value.filter((element) =>
          element.building.toLowerCase().startsWith(address.building)
        );
      }
    };

    const resetErrors = (event) => {
      address.id = null;
      var fieldName = event.target.name;
      errors.list[5].error = "";

      switch (fieldName) {
        case "floor_no":
          errors.list[0].floor_no = [];
          break;

        case "island":
          errors.list[1].island = [];
          break;

        case "country":
          errors.list[2].country = [];
          break;

        case "building":
          errors.list[3].building = [];
          filterAddressessList();
          break;

        case "road":
          errors.list[4].road = [];
          break;
      }
    };

     const setAddress = (filteredAddress) => {
      //  console.log(filteredAddress.customer[0].pivot);
      //  console.log(store.state.customer.selected_customer_id);
console.log(filteredAddress);
      filteredAddress.customer.map((element) => {
        if(element.pivot.customer_id == store.state.customer.selected_customer_id){
          return address.address_customer_id = element.pivot.address_id 
        }
      })
       
      address.id = filteredAddress.id;
      address.building = filteredAddress.building;
      address.road = filteredAddress.contact_no;
      address.floor_no = filteredAddress.floor_no;
      address.island = filteredAddress.island;
      filteredListModal.value = false;
    };

    return {
      errors,
      address,
      addresses,
      resetErrors,
      emitSaveAddress,
      filteredAddresses,
      filteredListModal,
      setAddress
    };
  },
};
</script>

<style>
</style>