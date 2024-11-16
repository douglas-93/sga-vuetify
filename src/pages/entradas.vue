<template>
  <v-container class="d-flex align-center justify-center mt-10" style="width: 80vw">
    <v-card class="pa-4 flex-fill">

      <v-row class="d-block pa-4">
        <h1 class="text-center">Registro de Entradas</h1>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" class="pa-4">
          <v-autocomplete
            variant="outlined"
            clearable
            label="Pessoa"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4" class="pa-4">
          <v-autocomplete
            variant="outlined"
            clearable
            label="Veículo"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4" class="pa-4">
          <v-autocomplete
            variant="outlined"
            clearable
            label="Empresa"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" class="pa-4">
          <v-text-field
            label="Setor Visitado"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="pa-4">
          <v-text-field
            :type="'datetime-local'"
            label="Data e Hora"
            v-model="dataHora"
            variant="outlined"
          ></v-text-field>
          <v-btn color="secondary" @click="dataHora = getDateNow()">Agora</v-btn>
        </v-col>

        <v-col cols="12" md="4" class="pa-4">
          <v-text-field
            label="Controlador"
            variant="outlined"
            disabled
            v-model="controlador"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-end ma-8">
        <v-btn color="secondary">Salvar</v-btn>
      </v-row>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {useDate} from 'vuetify'
import {ref} from "vue";

const getDateNow = () => {
  let today = new Date();
  let date = today.getFullYear() + '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') + '-' +
    today.getDate().toString().padStart(2, '0');
  let time = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0');
  return date + 'T' + time;
}

const controlador = 'José da Silva';
const dataHora = ref(getDateNow())
const date = useDate()

const formatted = date.format(new Date(), 'keyboardDateTime24h').slice(0, 17)


</script>
