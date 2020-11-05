<template>
  <div class="mt-3 px-3 py-4 bg-white rounded text-gray-700">
    <h4 class="pb-2 text-base font-light">Order Details</h4>
    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="code">Code</label>
      <input
        class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="code"
        id="code"
        maxlength="20"
        required
        autocomplete="off"
        v-model="order.code"
        @input="filterItemList"
      />
      <div
        v-show="filteredItems.list && filteredListModal"
        class="text-center absolute w-full left-0 px-8"
      >
        <ul
          v-for="(filteredItem, index) in filteredItems.list"
          :key="index"
          class="bg-gray-900 text-white"
        >
          <li
            @click="setItem(filteredItem)"
            class="py-3 cursor-pointer border-b"
          >{{ filteredItem }}</li>
        </ul>
      </div>
    </div>

     <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[0].code"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="item_name">Name</label>
      <input
        class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="text"
        name="name"
        id="item_name"
        maxlength="30"
        required
        v-model="order.name"
        readonly
      />
    </div>
     <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[1].name"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="quantity">QTY</label>
      <input
        class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="number"
        name="quantity"
        id="quantity"
        max="1000"
        min="1"
        placeholder="1"
        v-model="order.quantity"
      />
    </div>
     <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[2].quantity"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-2">
      <label class="text-sm font-thin uppercase" for="price">Price</label>
      <input
        class="px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
        type="number"
        name="price"
        id="price"
        min="1"
        max="9999999"
        placeholder="10.00"
        v-model="order.price"
      />
    </div>
     <p
      class="mt-1 text-xs italic text-red-500"
      v-for="error in errors.list[3].price"
      :key="error.index"
    >{{ error }}</p>

    <div class="mt-3 flex">
      <button
        class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600" name="order-save"
        @click="emitSaveOrder"
      >Save</button>
    </div>
    <div class="mt-3 flex">
      <button
        class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600" name="order-complete"
        @click="emitSaveOrder"
      >Complete</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore, mapState } from "vuex";

export default {
  name: "NewOrderForm",

  setup(props, {emit}){
    onMounted(() => {
      store.dispatch("getItems");
    });

    const items = computed(() => {
      return store.state.item.items;
    });

    const store = useStore();
    let order = reactive({
        id: "",
        code: "",
        name: "",
        quantity: "",
        price: "",
      });

    const filteredItems = reactive({ list: [] });

    const filteredListModal = ref(false);

    const errors = reactive({
      list: [{ code: [] }, { name: [] }, { quantity: [] }, { price: [] }, { error: "" }]
    })

    const emitSaveOrder = () => {
      errors.list = [{ code: [] }, { name: [] }, { quantity: [] }, { price: [] }, { error: "" }];
      console.log(order.name);
      if (!order.code) {
        errors.list[0].code.push("Item code is required if item name is empty");
      }
      else if (order.code && order.code.length > 20 ) {
        errors.list[0].code.push(
          "Item code should be less than 20 characters"
        );
      }

      if(!order.name){
        errors.list[1].name.push("Item Name is required if item code is empty");
      }
      else if (order.name && order.name.length > 30 ) {
        errors.list[1].name.push(
          "Item name should be less than 30 characters"
        );
      }

      if (!order.quantity) {
        errors.list[2].quantity.push("Quantity is required");
      } else if (order.quantity > 9999999 || order.quantity < 1) {
        errors.list[2].quantity.push(
          "Quantity should be greated than zero and less than a million");
      }

      if (!order.price) {
        errors.list[3].price.push("Price is required");
      } else if (order.price > 9999999 || order.price < 1) {
        errors.list[3].price.push(
          "Price should be greated than zero");
      }

      if (
        errors.list[0].code.length === 0 &&
        errors.list[1].name.length === 0 &&
        errors.list[2].quantity.length === 0 &&
        errors.list[3].price.length === 0 
      ) {

         

        if(event.target.name == 'order-save'){
          emit("saveOrder", {
            order: order
          }); 
        }else{
          console.log('done')
          emit("completeOrder", {
          order: order
        });
        }
        order.id = null; 
        order.code = null;
        order.name = null;
        order.quantity = null;
        order.price = null;        
      }
    };

    const filterItemList = (filteredItem) => {
       order.id = "";
        order.name = "";
      filteredListModal.value = true;
      if (!order.code) {
        filteredItems.list = [];
      } else {
        filteredItems.list = items.value.filter((element) => {
          return element.code
            .toLowerCase()
            .startsWith(order.code.toLowerCase());
        });
      }
    };

    const setItem = (filteredItem) => {

      order.id = filteredItem.id;
      order.code = filteredItem.code;
      order.name = filteredItem.name;
      // order.price = filteredItem.contact_no;
      filteredListModal.value = false;
    };

    return {
        order,
        errors,
        emitSaveOrder,
        filteredItems,
        items,
        filteredListModal,
        setItem,
        filterItemList
      }
  }
}
</script>

<style>
</style>