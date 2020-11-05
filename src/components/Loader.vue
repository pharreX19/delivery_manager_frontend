<template>
  <div class="absolute inset-0 min-h-screen flex items-center justify-center bg-opacity-75 bg-black z-10">
      <div>
          <div class="text-center">
              <pulse-loader></pulse-loader>

          </div>
          <h3 class="mt-3 text-center" :class="loading_text_color">Please Wait</h3>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Loader',
    
    props: {
        'loading_text_color': {
            type: String,
            required: false,
            default: 'text-white'
        }
    }
}
</script>

<style>

</style>

