<template>
  <header class=" w-screen bg-blue-800 text-white py-1 px-2">
      <div class="px-2 py-2 flex items-center justify-between">
          <div>
              <img src="../assets/logo.png" class="w-10 h-10 object-cover" alt="">
        </div>
      <div>
          <button class="px-2" @click="isExpanded = !isExpanded">=</button>
      </div>
      </div>
      <nav class="font-medium text-sm flex flex-row-reverse text-right" v-show="isExpanded">
          <div class="px-4" @click="select_route">
              <router-link to="/" class="block py-1 hover:text-gray-400">Dashboard</router-link>
              <a @click="delivery_route_clicked"><router-link to="/delivery" class="block py-1 hover:text-gray-400" >Delivery</router-link></a>
              <router-link to="/jobs" class="block py-1 hover:text-gray-400" >Jobs</router-link>
              <router-link to="/report" class="block py-1 hover:text-gray-400" >Report</router-link>
              <a to="" class="block py-1 hover:text-gray-400" id="admin_parent_link" @click="showAdminSubPanel=!showAdminSubPanel">Admin Panel</a>
              <div class="mr-6" v-show="showAdminSubPanel">
                <router-link to="/admin/manage-staff" class="block py-1 hover:text-gray-400" >Manage Staff</router-link>
                <router-link to="/admin/manage-items" class="block py-1 hover:text-gray-400" >Manage Items</router-link>
                <router-link to="/admin/profile" class="block py-1 hover:text-gray-400" >Profile</router-link>
              </div>
              <router-link to="/login" class="block py-1 hover:text-gray-400" >Login</router-link>
              <a @click="logout"><router-link to="#" class="block py-1 hover:text-gray-400" >Logout</router-link></a>

          </div>
      </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useStore, mapState } from 'vuex';
export default {
    name: 'Navbar',

    setup(props){
        const isExpanded = ref(false);
        const showAdminSubPanel = ref(false);
        const store = useStore()
    
        const select_route = () => {
            console.log(event.target.id);
            if(event.target.id != 'admin_parent_link'){
                isExpanded.value = false;
            }
        };

        const delivery_route_clicked = () => {
            store.commit('SHOW_CUSTOMER_FORM', true);
            store.commit('SHOW_ADDRESS_FORM', false);
            store.commit('SHOW_ORDER_FORM', false);
        }

        const logout = () => {
            store.dispatch('logout')
        }



        return {
            isExpanded,
            showAdminSubPanel,
            select_route,
            delivery_route_clicked,
            logout
        }
    }
}
</script>

<style>

</style>