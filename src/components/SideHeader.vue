<template>
   <header class="bg-gray-900">
      <div class="flex justify-between  px-4 py-3 items-center">
        <div>
          <img src="../assets/logo.png" class="h-8 w-auto" alt />
        </div>

        <div class="flex">
          <button type="button" @click="toggle" class="px-2 text-gray-500 hover:text-white focus:outline-none focus:text-white">
            <svg
              height="20"
              class="fill-current h6 w6"
              viewBox="0 -53 384 384"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
              />
              <path
                d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
              />
              <path
                d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
              />
            </svg>
          </button>
        </div>
      </div>

      <nav v-show="isOpen">
        <div class="px-3 pt-2 pb-5 border-b border-gray-800">
          <a href class="leading-tight px-4 py-3 rounded font-semibold block hover:bg-gray-800 text-white">Dashboard</a>
          <a href class="leading-tight px-4 py-3 mt-2 font-semibold block hover:bg-gray-800 text-white">Delivery</a>
          <a href class="leading-tight px-4 py-3 mt-2 font-semibold block hover:bg-gray-800 text-white">Reports</a>
          <a href class="leading-tight px-4 py-3 mt-2 font-semibold block hover:bg-gray-800 text-white">Logout</a>
        </div>
      </nav>
    </header>
</template>

<script>
export default {
    name: 'SideHeader',

    data(){
        return{
            isOpen : false
        }
    },
    methods :{
        toggle(){
            this.isOpen = !this.isOpen;
        }
    }
}
</script>

<style>

</style>