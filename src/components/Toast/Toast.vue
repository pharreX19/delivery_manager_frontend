<template>
<transition name="bounce">
  <div class="m-5 mt-20 absolute right-0 top-0" v-show="toast_message">
      <div class="py-3 px-3 flex items-center border-l-4 shadow-lg mb-2 rounded-sm sha" :class="toast_type == 'success' ? ' bg-green-500 border-green-700 ' : 'bg-red-500 border-red-700' ">
          <div>
              <svg class="h-6 w-6" xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' style='fill:white;stroke:#FFF;stroke-miterlimit:10;stroke-width:32px'/><polyline points='352 176 217.6 336 160 272' style='fill:white;stroke:#48BB78;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>
          </div>
          <p class="px-2 max-w-xs text-white text-base">{{ toast_message }}</p>
      </div>
  </div>
</transition>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
export default {
    name: 'Toast',
    props: {
        message: {
            // type: String,
            required: true
        },
        toast_type: {
            type: String,
            required: true,
            default: 'fail'
        }
    },
    setup(props){
        
        const toast_message = ref(null);

        onMounted(() => {
            // toast_message.value = props.message
        })

        watch(
            () => props.message, 
            (selection, prevValue) => {
            if(props.message != null){
                    toast_message.value = props.message
                setTimeout(() => {
                    toast_message.value = null
                }, 2000)
            }
        })

        return {
            toast_message
        }
    }
}
</script>

<style>

.bounce-enter-active{
    animation: bounce-in .5s;
}

.bounce-leave-active{
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        transform: translateX(10px);
    }
    25% {
        transform: translateX(40px);
    }
    50% {
        transform: translateX(60px);
    }
    100% {
        transform: translateX(100px);
    }
}

</style>