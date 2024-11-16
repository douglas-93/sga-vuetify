<template>
  <v-container class="d-flex align-center justify-center mt-10">
    <v-card max-width="80vw" class="pa-4">
      <v-card-title class="text-h5 text-center">
        <v-img src="../assets/logo858x270.png" height="8rem"></v-img>
      </v-card-title>
      <v-card-text class="text-center ma-5">
        <h2 class="ma-5">Registro</h2>
        <v-btn @click="goToPage('entradas')" rounded="xl" variant="tonal" size="x-large" class="ma-2">Registrar Entradas</v-btn>
        <v-btn @click="goToPage('saidas')" rounded="xl" variant="tonal" size="x-large" class="ma-2">Registrar Saídas</v-btn>
      </v-card-text>
      <v-card-text class="text-center ma-5">
        <h2 class="ma-5">Cadastro</h2>
        <v-btn @click="goToPage('pessoas')" rounded="xl" variant="tonal" size="x-large" class="ma-2">Cadastrar Pessoas</v-btn>
        <v-btn @click="goToPage('veiculos')" rounded="xl" variant="tonal" size="x-large" class="ma-2">Cadastrar Veículos</v-btn>
        <v-btn @click="goToPage('empresas')" rounded="xl" variant="tonal" size="x-large" class="ma-2">Cadastrar Empresas</v-btn>
        <v-btn @click="goToPage('controladores')" rounded="xl" variant="tonal" size="x-large" class="ma-2">Cadastrar Controladores</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();

const goToPage = (page: string) => {
  if (page) {
    router.push(`${page}`);
  }
};
</script>
