<template>
  <v-app>
    <!-- Formulário de Cadastro -->
    <v-container class="d-flex align-center justify-center mt-10" style="width: 80vw">
      <v-card class="pa-4 flex-fill">

        <v-row class="d-block pa-4">
          <h1 class="text-center">Cadastro de Pessoas</h1>
        </v-row>
        <v-row>


          <v-col cols="12" md="5">
            <v-text-field
              v-model="pessoa.nome"
              label="Nome"
              :rules="nameRules"
              required
              variant="outlined"
              clearable
              @input="pessoa.nome = pessoa.nome.toUpperCase()"
            ></v-text-field>
          </v-col>


          <v-col cols="12" md="2" class="d-flex align-center justify-end flex-fill">
            <v-spacer></v-spacer><v-spacer></v-spacer>
            <v-radio-group inline v-model="documentoSelecionado" @change="aplicaMascara">
              <v-radio label="RG" value="rg"></v-radio>
              <v-radio label="CPF" value="cpf"></v-radio>
            </v-radio-group>
          </v-col>


          <v-col cols="12" md="5">
            <v-text-field
              v-model="pessoa.documento"
              label="Documento"
              required
              variant="outlined"
              clearable
              @input = "aplicaMascara"
              :maxlength="caracteresDocumento"
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
      Pessoa cadastrada com sucesso!
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import { PessoaModel } from "@/models/pessoa.model";

// Criando o modelo de pessoa como reativo
const pessoa = reactive(new PessoaModel());
pessoa.nome = '';
pessoa.documento = '';
const documentoSelecionado = ref('rg');
const caracteresDocumento = ref(13);

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
  console.log(pessoa);
  snackbar.value = true;
};

// Função para aplicar a máscara do CPF
const applycpfMask = () => {
  let cpf = pessoa.documento.replace(/\D/g, ''); // Remove tudo que não for número
  if (cpf.length <= 3) {
    pessoa.documento = cpf;
  } else if (cpf.length <= 6) {
    pessoa.documento = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  } else if (cpf.length <= 9) {
    pessoa.documento = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else {
    pessoa.documento = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }
};

// Função para aplicar a máscara do RG
const applyRgMask = () => {
  let rg = pessoa.documento.replace(/[^a-zA-Z0-9]/g, ''); // Remove tudo que não for letra ou número

  // Limitar a entrada a 10 caracteres (2 letras + 8 números)
  if (rg.length > 10) {
    rg = rg.slice(0, 10);
  }

  // Aplicar a máscara com base na quantidade de caracteres
  if (rg.length <= 2) {
    pessoa.documento = rg.toUpperCase();
  } else if (rg.length <= 5) {
    pessoa.documento = `${rg.slice(0, 2).toUpperCase()}-${rg.slice(2, 4)}`;
  } else if (rg.length <= 8) {
    pessoa.documento = `${rg.slice(0, 2).toUpperCase()}-${rg.slice(2, 4)}.${rg.slice(4, 7)}`;
  } else {
    pessoa.documento = `${rg.slice(0, 2).toUpperCase()}-${rg.slice(2, 4)}.${rg.slice(4, 7)}.${rg.slice(7, 11)}`;
  }
};

const aplicaMascara = () => {
  caracteresDocumento.value = documentoSelecionado.value === 'cpf' ? 14 : 13;
  documentoSelecionado.value === 'cpf' ? applycpfMask() : applyRgMask();
}
</script>

<style scoped>
.v-container {
  max-width: 80vw;
}
</style>
