<template>
  <div class="min-h-screen bg-blue-900">
    <div class="py-3 px-5 text-white">
      <h3 class="text-lg font-medium text-white text-center">Profile</h3>
      <div class="mt-3">
        <label class="text-sm font-thin" for="current_password">Current Password</label>
        <input
          class="mt-2 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
          type="text"
          name="current_password"
          id="current_password"
          maxlength="30"
          required
          placeholder="********"
        />
        <p class="mt-1 text-xs italic text-red-500">Please enter current password</p>
      </div>

      <div class="mt-3">
        <label class="text-sm font-thin" for="new_password">New Password</label>
        <input
          class="mt-2 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
          type="text"
          name="new_password"
          id="new_password"
          maxlength="30"
          required
          placeholder="********"
        />
        <p class="mt-1 text-xs italic text-red-500">Please enter a new password</p>
      </div>

      <div class="mt-3">
        <label class="text-sm font-thin" for="confirm_password">Confirm Password</label>
        <input
          class="mt-2 px-2 w-full text-sm py-2 border border-gray rounded focus:shadow-outline"
          type="text"
          name="confirm_password"
          id="confirm_password"
          maxlength="30"
          required
          placeholder="********"
        />
        <p class="mt-1 text-xs italic text-red-500">Passwords do not match</p>
      </div>

      <div class="mt-8 flex">
        <button class="py-2 px-5 w-full rounded shadow-lg text-white bg-green-600">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>

<style>
</style>