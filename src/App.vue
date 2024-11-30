<template>
  <v-app>
    <TopBar v-if="!login" @togglesidebar="drawer = !drawer" />
    <SideBar v-model:drawer="drawer" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";

const drawer = ref(false);
const login = ref(false);

const checkLoginPath = () => {
  login.value = window.location.href.includes('/login')
}

checkLoginPath()

</script>
