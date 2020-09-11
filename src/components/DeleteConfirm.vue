<template>
  <div
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex items-center justify-center bg-opacity-50 bg-black">
    <div class="relative mx-auto w-64 h-auto z-50">
      <div class="px-5 h-full text-sm bg-white w-full text-gray-700 rounded">
        <div class="py-5">
          <h3 class="text-lg font-medium text-gray-700 text-center">Are you sure?</h3>
        </div>
        <div class="pb-5 flex justify-center items-center">
          <button class="py-2 px-5 w-full rounded shadow-lg text-white bg-red-600" @click="emit_delete_confirm">Confirm</button>
          <button class="ml-2 py-2 px-5 w-full rounded shadow-lg text-white bg-teal-600" @click="emit_cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'DeleteConfirm',
    methods: {
        emit_cancel(){
            this.$emit('cancel');
        },
        emit_delete_confirm(){
            this.$emit('delete_confirm');
        }
    }
};
</script>

<style>
</style>