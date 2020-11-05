<template>
  <div class="min-h-screen bg-blue-900 flex items-center justify-center">
    <div class="w-full max-w-xs">
      <div class="bg-white shadow-md px-8 pt-6 pb-8 rounded-md">
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-medium mb-2" for="name">Name</label>
                <loader v-show="is_loading"/>

          <input
            class="px-3 py-2 rounded block w-full text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border"
            type="text"
            name="name"
            id="name"
            v-model="credentials.name"
            placeholder="Name"
            @input="resetErrors($event)"
          />
          <p class="mt-1 text-xs italic text-red-500" v-for="error in errors.login_errors[0].name" :key="error.index">
            {{ error }}
            </p>
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-medium mb-2" for="password">Password</label>
          <input
            class="px-3 py-2 rounded block w-full text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border"
            type="password"
            name="password"
            id="password"
            v-model="credentials.password"
            placeholder="*******"
            @input="resetErrors($event)"
          />
        <p class="mt-1 text-xs italic text-red-500" v-for="error in errors.login_errors[1].password" :key="error.index">
          {{ error }}
        </p>

        <div class="mt-4">
          <p class="mt-1 text-xs italic text-red-500 text-center font-medium">
          {{ errors.login_errors[2].error }}
        </p>
        </div>

        </div>
        <div class="mt-6 flex flex-row-reverse">
          <button
            class="px-3 py-2 rounded text-white text-sm bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          @click="login">Sign in</button>
        </div>
      </div>
      <div class="mt-2">
        <p class="text-center text-gray-500 text-xs">&copy;2020 Cell Tech. All rights reserved.</p>
      </div>
    </div>
  </div>
  {{errors}}
</template>

<script>
import Axios from 'axios';
// import {api_login} from '../api/auth.api.js'
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Loader from './Loader.vue'
import router from '../router/index';
import { useStore } from 'vuex';

export default {
  name: "Login",
  components: {
    Loader
  },

  setup(){
    const store = useStore();

    let credentials = {
      name: '',
      password:'',
    };

    let is_loading = ref(false);

    let errors = reactive({
      login_errors : [
        {name : []},
        {password : []},
        {error : ''},
      ]
    });

    const login = () => {
      errors.login_errors = [
        {name : []},
        {password : []},
        {error : ''},
      ];

      if(!credentials.name){
        errors.login_errors[0].name.push('Name field is required');
      }
      if(!credentials.password){
         errors.login_errors[1].password.push('Password field is required');
      }
      else if(credentials.password.length < 5){
        errors.login_errors[1].password.push('Password must not be less than 5 characters');
      }

      if(errors.login_errors[0].name.length === 0 && errors.login_errors[1].password.length === 0){
          store.dispatch('login', credentials);
      //   is_loading.value = true;
      // api_login(credentials.name, credentials.password).then(
      //   (response) => {
      //     is_loading.value = false;
      //     localStorage.setItem('access_token', response.data.access_token.token);
      //     router.replace({'path': '/'})
      //   }, (res_errors) => {
      //     is_loading.value = false;
      //     errors.login_errors = [
      //       { name: res_errors.name ?? '' },
      //       { password: res_errors.password ?? '' },
      //       { error: res_errors.failure_message ?? '' },
      //     ]
      //   });
      }
    };
    
    const resetErrors = (event) => {
      var fieldName = event.target.name;
      errors.login_errors[2].error = '';
      if(fieldName == 'name'){
        errors.login_errors[0].name =[];
      }else{
        errors.login_errors[1].password =[];
      }
    }

    return {
      errors,
      credentials,
      resetErrors,
      login,
      is_loading,
    }
  }
};
</script>

<style>
</style>