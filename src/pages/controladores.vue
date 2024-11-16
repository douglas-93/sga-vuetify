<template>
  <v-app>
    <!-- Formulário de Cadastro -->
    <v-container class="d-flex align-center justify-center mt-10" style="width: 80vw">
      <v-card class="pa-4 flex-fill">

        <v-row class="d-block pa-4">
          <h1 class="text-center">Cadastro de Controladores</h1>
        </v-row>
        <v-row>


          <v-col cols="12" md="5">
            <v-text-field
              v-model="controlador.nome"
              label="Nome"
              :rules="nameRules"
              required
              variant="outlined"
              clearable
              @input="controlador.nome = controlador.nome.toUpperCase()"
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
              v-model="controlador.documento"
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
          <v-col cols="12" md="4">
            <v-text-field
              v-model="controlador.matricula"
              label="Matrícula"
              variant="outlined"
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="controlador.usuario"
              label="Usuário"
              required
              variant="outlined"
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="controlador.senha"
              label="Senha"
              required
              variant="outlined"
              clearable
              :type="'password'"
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
      Controlador cadastrado com sucesso!
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {applyCpfMask, applyRgMask} from "@/utils/formatadores";
import {ControladorModel} from "@/models/controlador.model";

// Criando o modelo de pessoa como reativo
const controlador = reactive(new ControladorModel());
controlador.nome = '';
controlador.documento = '';
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
  console.log(controlador);
  snackbar.value = true;
};

const aplicaMascara = () => {
  caracteresDocumento.value = documentoSelecionado.value === 'cpf' ? 14 : 13;
  documentoSelecionado.value === 'cpf' ? applyCpfMask(controlador) : applyRgMask(controlador);
}
</script>

<style scoped>
.v-container {
  max-width: 80vw;
}
</style>
