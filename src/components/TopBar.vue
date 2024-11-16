<template>

    <v-app-bar app dark prominent>
      <v-app-bar-nav-icon @click="$emit('togglesidebar')"></v-app-bar-nav-icon>
      <v-toolbar-title class="cursor-pointer" @click="goToPage('/')">Sistema de Gestão de Acesso :: SGA</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="toggleTheme">
        <font-awesome-icon :icon="['fas', themeIcon]"/>
      </v-btn>
      <v-btn icon @click="goToPage('/login')">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useTheme} from "vuetify";
import {ref} from "vue";
import router from "@/router";

const theme = useTheme()
const themeIcon = ref('sun');

const toggleTheme = () => {
  themeIcon.value === 'sun' ? themeIcon.value = 'moon' : 'sun'
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const goToPage = (page: string) => {
  if (page) {
    router.push(`${page}`);
  }
};
</script>

<style scoped>

</style>
