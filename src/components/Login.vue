<template>
  <div class="min-h-screen bg-blue-900 flex items-center justify-center">
    <div class="w-full max-w-xs">
      <div class="bg-white shadow-md px-8 pt-6 pb-8 rounded-md">
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-medium mb-2" for="name">Name</label>
          <input
            class="px-3 py-2 rounded block w-full text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border"
            type="text"
            name="name"
            id="name"
            v-model="name"
            placeholder="Name"
          />
          <p class="mt-1 text-xs italic text-red-500">Please enter a name to login</p>
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-medium mb-2" for="password">Password</label>
          <input
            class="px-3 py-2 rounded block w-full text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border"
            type="password"
            name="password"
            id="password"
            v-model="password"
            placeholder="*******"
          />
        <p class="mt-1 text-xs italic text-red-500">Please enter a password</p>

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
</template>

<script>
import Axios from 'axios';
import {login} from '../api/auth.api.js'
export default {
  name: "Login",
  data(){
    return {
      name: '',
      password:''
    }
  },
  methods: {
    login(){
      login(this.name, this.password)
    }
  }
};
</script>

<style>
</style>