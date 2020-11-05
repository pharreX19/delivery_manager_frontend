<template>
  <div class="min-h-screen bg-blue-900">
    <!-- <div class="absolute"> -->
      <navbar />
      <toast :message="errors"/>
    <!-- </div> -->
    <!-- <div class="relative pt-20"> -->
          <loader v-show="is_loading"/>
      <router-view />
    <!-- </div> -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Loader from "./components/Loader.vue";
import Toast from './components/Toast/Toast.vue'
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    Loader,
    Toast
  },

  setup(props) {
    const store = useStore();

    const is_loading = computed(() => store.state.is_loading);
    const errors = computed(() => store.state.errors);

    return {
      is_loading,
      errors
    };
  },
};
</script>

<style>
</style>
