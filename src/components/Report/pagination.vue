<template>
  <div>
      <div class="text-white">
          <p class="border rounded-md cursor-pointer hover:bg-white hover:text-gray-900 px-5 py-3 m-1" @click="emit_page_number(page_number)" >{{ page_number }}</p>
      </div>
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
    name: 'Pagination',
    props: {
        page_number: {
            type: Number,
            required: true
        },
    },  
    setup(props, {emit}){
        const page_number = computed(() => {
            return props.page_number;
        });

    const emit_page_number = (page_number) => {
        emit('emit_clicked_page', page_number);
    }

        return {
        page_number,
        emit_page_number
        }
    },
}
</script>

<style>

</style>