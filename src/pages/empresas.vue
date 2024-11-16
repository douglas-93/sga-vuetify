<template>
  <v-app>
    <!-- Formulário de Cadastro -->
    <v-container class="d-flex align-center justify-center mt-10" style="width: 80vw">
      <v-card class="pa-4 flex-fill">

        <v-row class="d-block pa-4">
          <h1 class="text-center">Cadastro de Empresas</h1>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="empresa.nome"
              label="Nome"
              :rules="nameRules"
              required
              variant="outlined"
              clearable
              @input="empresa.nome = empresa.nome.toUpperCase()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="empresa.cnpj"
              label="CNPJ"
              required
              variant="outlined"
              clearable
              @input="applyCnpjMask"
              :maxlength="18"
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
      Empresa cadastrada com sucesso!
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {EmpresaModel} from "@/models/empresa.model";

// Criando o modelo de pessoa como reativo
const empresa = reactive(new EmpresaModel());
empresa.nome = '';
empresa.cnpj = '';

// Estado do formulário e validação
const valid = ref(false);
const snackbar = ref(false);

// Regras de validação para os campos
const nameRules = [
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
  console.log(empresa);
  snackbar.value = true;
};

// Função para aplicar a máscara do CNPJ
const applyCnpjMask = () => {
  let cnpj = empresa.cnpj.replace(/\D/g, ''); // Remove tudo que não for número

  if (cnpj.length <= 2) {
    empresa.cnpj = cnpj;
  } else if (cnpj.length <= 5) {
    empresa.cnpj = cnpj.replace(/(\d{2})(\d{1,3})/, '$1.$2');
  } else if (cnpj.length <= 8) {
    empresa.cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else if (cnpj.length <= 12) {
    empresa.cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
  } else {
    empresa.cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
  }
};
</script>

<style scoped>
.v-container {
  max-width: 80vw;
}
</style>
