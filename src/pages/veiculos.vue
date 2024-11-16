<template>
  <v-app>
    <!-- Formulário de Cadastro -->
    <v-container class="d-flex align-center justify-center mt-10" style="width: 80vw">
      <v-card class="pa-4 flex-fill">

        <v-row class="d-block pa-4">
          <h1 class="text-center">Cadastro de Veículos</h1>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="veiculo.placa"
              label="Placa"
              :rules="placaRules"
              required
              variant="outlined"
              clearable
              @input="veiculo.placa = veiculo.placa.toUpperCase()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="veiculo.modelo"
              label="Modelo"
              required
              variant="outlined"
              clearable
              @input="veiculo.modelo = veiculo.modelo.toUpperCase()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-end pb-8">
            <v-btn :disabled="!valid" color="success" @click="submitForm">Salvar</v-btn>
          </v-col>
        </v-row>

      </v-card>
    </v-container>

    <!-- Mensagem de sucesso -->
    <v-snackbar v-model="snackbar" :timeout="2000" color="success">
      Veículo cadastrado com sucesso!
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {VeiculoModel} from "@/models/veiculo.model";

// Criando o modelo de veiculo como reativo
const veiculo = reactive(new VeiculoModel());
veiculo.placa = '';
veiculo.modelo = '';

// Estado do formulário e validação
const valid = ref(false);
const snackbar = ref(false);

// Regras de validação para os campos
const placaRules = [
  (value: string) => {
    if (value?.length >= 3) {
      valid.value = true;
      return true;
    }
    valid.value = false;
    return 'O nome não pode estar vazio ou conter menos de 2 caracteres';
  },
];

// Função para simular o envio do formulário
const submitForm = () => {
  console.log(veiculo);
  snackbar.value = true;
};
</script>

<style scoped>
.v-container {
  max-width: 80vw;
}
</style>
