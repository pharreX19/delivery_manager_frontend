<template>
<!-- min-h-screen bg-blue-900npm run -->
  <div>
     <!-- class="py-3 px-5 text-gray-700" -->
    <div class="py-3 px-5">
      <h3 class="text-lg font-medium text-white text-center">Profile</h3>
      <div class="mt-3">
        <label class="text-sm font-thin text-white" for="old_password">Current Password</label>
        <input
          class="mt-2 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
          type="password"
          name="old_password"
          id="old_password"
          maxlength="30"
          required
          placeholder="********"
          v-model="profile.old_password"
          @input="resetErrors"
        />
        <p
          class="mt-1 text-xs italic text-red-500"
          v-for="error in errors.profile_errors[0].old_password"
          :key="error.index"
        >{{ error }}</p>
      </div>

      <div class="mt-3">
        <label class="text-sm font-thin text-white" for="password">New Password</label>
        <input
          class="mt-2 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
          type="password"
          name="password"
          id="password"
          maxlength="30"
          required
          placeholder="********"
          v-model="profile.password"
          @input="resetErrors"
        />
        <p
          class="mt-1 text-xs italic text-red-500"
          v-for="error in errors.profile_errors[1].password"
          :key="error.index"
        >{{ error }}</p>
      </div>

      <div class="mt-3">
        <label class="text-sm font-thin text-white" for="password_confirmation">Confirm Password</label>
        <input
          class="mt-2 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          maxlength="30"
          required
          placeholder="********"
          v-model="profile.password_confirmation"
          @input="resetErrors"
        />
        <p
          class="mt-1 text-xs italic text-red-500"
          v-for="error in errors.profile_errors[2].password_confirmation"
          :key="error.index"
        >{{ error }}</p>
      </div>

      <div class="mt-8 flex">
        <button
          class="py-2 px-5 w-full text-base rounded shadow-lg text-white bg-green-600"
          @click="updateProfile"
        >Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { api_user_update } from '../api/users.api.js'
import { useStore } from 'vuex'
export default {
  name: "Profile",

  setup(){
    const store = new useStore();

    let profile = {
        old_password: "",
        password: "",
        password_confirmation: "",
      };

    let errors = reactive({ 
        profile_errors: [
          { old_password: [] },
          { password: [] },
          { password_confirmation: [] },
          { error: "" },
      ]
    });

     const updateProfile = () => {
       console.log(errors.profile_errors[0].old_password);
      errors.profile_errors = [
        { old_password: [] },
        { password: [] },
        { password_confirmation: [] },
        { error: "" },
      ];

      if (!profile.old_password) {
        errors.profile_errors[0].old_password.push("Password is required");
      } else if (profile.old_password.length > 30 || profile.old_password.length < 5) {
        errors.profile_errors[0].old_password.push(
          "Password should be greather than 5 and less than 30 characters"
        );
      }

      if (!profile.password) {
        errors.profile_errors[1].password.push("New password is required");
      } else if (profile.password.length > 30 || profile.password.length < 5) {
        errors.profile_errors[1].password.push(
          "Password should be greater than 5 and less than 30 characters"
        );
      }

      if (!profile.password_confirmation) {
        errors.profile_errors[2].password_confirmation.push("Confirm password is required");
      } else if (profile.password_confirmation.length > 30) {
        errors.profile_errors[2].password_confirmation.push(
          "Password should be less than 30 characters"
        );
      } else if (profile.password !== profile.password_confirmation) {
        errors.profile_errors[2].password_confirmation.push(
          "Password doesn't match new password"
        );
      }

      if (
        errors.profile_errors[0].old_password.length === 0 &&
        errors.profile_errors[1].password.length === 0 &&
        errors.profile_errors[2].password_confirmation.length === 0
      ) {
          api_user_update(profile);
      }
    };

    const resetErrors = (event) => {
      var fieldName = event.target.name;
      errors.profile_errors[3].error = "";

      switch (fieldName) {
        case "old_password":
          errors.profile_errors[0].old_password = [];
          break;

        case "password":
          errors.profile_errors[1].password = [];
          break;

        case "password_confirmation":
          errors.profile_errors[2].password_confirmation = [];
          break;
      }
    };
    

    const api_user_update = (profileObject) => {
      console.log(profileObject);
      store.dispatch('updateUser', profileObject);
        // is_loading.value = true;
        // api_user_update(1, profileObject.old_password, profileObject.password, profileObject.password_confirmation).then(
        //   (response) => {
        //     is_loading.value = false;
        //     console.log(response.data.success_message)
        //   },
        //   (errors) => {
        //     is_loading.value = false;
        //     console.log(errors)
        //   }
        // )
    };

    return {
      profile,
      errors,
      updateProfile,
      resetErrors

    }
  } 
};
</script>

<style>
</style>