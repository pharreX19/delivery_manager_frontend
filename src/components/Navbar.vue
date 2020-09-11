<template>
  <header class="w-screen bg-blue-900 text-white py-1 px-2">
      <div class="px-2 py-2 flex items-center justify-between">
          <div>
              <img src="../assets/logo.png" class="w-10 h-10 object-cover" alt="">
        </div>
      <div>
          <button class="px-2" @click="isExpanded = !isExpanded">=</button>
      </div>
      </div>
      <nav class="font-medium text-sm flex flex-row-reverse text-right" v-show="isExpanded">
          <div class="px-4">
              <router-link to="/" class="block py-1 hover:text-gray-400">Dashboard</router-link>
              <router-link to="/delivery" class="block py-1 hover:text-gray-400" >Delivery</router-link>
              <router-link to="/jobs" class="block py-1 hover:text-gray-400" >Jobs</router-link>
              <router-link to="/report" class="block py-1 hover:text-gray-400" >Report</router-link>
              <a to="" class="block py-1 hover:text-gray-400" @click="showAdminSubPanel=!showAdminSubPanel">Admin Panel</a>
              <div class="mr-6" v-show="showAdminSubPanel">
                <router-link to="/admin/manage-staff" class="block py-1 hover:text-gray-400" >Manage Staff</router-link>
                <router-link to="/admin/manage-items" class="block py-1 hover:text-gray-400" >Manage Items</router-link>
                <router-link to="/admin/profile" class="block py-1 hover:text-gray-400" >Profile</router-link>
              </div>
              <router-link to="/login" class="block py-1 hover:text-gray-400" >Login</router-link>
              <router-link to="#" class="block py-1 hover:text-gray-400" >Logout</router-link>

          </div>
      </nav>
  </header>
</template>

<script>
export default {
    name: 'Navbar',
    data: function(){
        return{
            isExpanded : false,
            showAdminSubPanel: false
        }
    }
}
</script>

<style>

</style>