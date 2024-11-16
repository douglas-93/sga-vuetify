<template>
  <v-app>
    <TopBar @togglesidebar="drawer = !drawer" />
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
</script>
