<template>
  <div class="py-3 px-5">
      <div class="px-4 py-1 bg-white w-full rounded-md">
        <h3
          class="mt-3 py-3 px-3 text-center rounded font-bold text-white" :class="color"
        >{{ title }}</h3>
        <h2 class="px-3 py-3 text-center text-md uppercase text-gray-900">
          <span class="font-bold text-xl">{{ count }}</span>
          {{subtitle}}
        </h2>
      </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardCard',
    props: {
        title : {
            type: String,
            required: true
        },
        subtitle : {
            type: String,
            required: true
        },
        count : {
            type: Number,
            required: true
        },
        color : {
            type: String,
            required: true
        },
    },
}
</script>

<style>

</style>