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
            <v-text-field v-model="pessoa.nome" label="Nome" :rules="nameRules" required variant="outlined" clearable
              @input="pessoa.nome = pessoa.nome.toUpperCase()"></v-text-field>
          </v-col>


          <v-col cols="12" md="2" class="d-flex align-center justify-end flex-fill">
            <v-spacer></v-spacer><v-spacer></v-spacer>
            <v-radio-group inline v-model="documentoSelecionado" @change="aplicaMascara">
              <v-radio label="RG" value="rg"></v-radio>
              <v-radio label="CPF" value="cpf"></v-radio>
            </v-radio-group>
          </v-col>


          <v-col cols="12" md="5">
            <v-text-field v-model="pessoa.documento" label="Documento" required variant="outlined" clearable
              @input="aplicaMascara" :maxlength="caracteresDocumento"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-end pb-8">
            <v-btn :disabled="!valid" color="success" @click="submitForm">Salvar</v-btn>
          </v-col>
        </v-row>

      </v-card>
    </v-container>

    <!--    LISTAGEM DE PESSOAS     -->
    <v-container class="d-flex align-center justify-center mt-10" style="width: 80vw">
      <v-card class="pa-4 flex-fill">

        <v-row class="d-block pa-4">
          <h1 class="text-center">Pessoas Cadastradas</h1>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Nome" variant="outlined" clearable v-model="nome"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Documento" variant="outlined" clearable v-model="documento"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn @click="buscarPessoas()">Pesquisar</v-btn>
          </v-col>
        </v-row>

        <v-table v-if="listaPessoas.length > 0">
          <thead>
            <tr>
              <th class="text-left">
                Nome
              </th>
              <th class="text-left">
                Documento
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in listaPessoas" :key="item.id">
              <td>{{ item.nome }}</td>
              <td>{{ item.documento }}</td>
            </tr>
          </tbody>
        </v-table>



      </v-card>
    </v-container>

    <!-- Mensagem de sucesso -->
    <v-snackbar v-model="snackbar" :timeout="2000" color="success">
      Pessoa cadastrada com sucesso!
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { PessoaModel } from "@/models/pessoa.model";
import { applyCpfMask, applyRgMask } from "@/utils/formatadores";
import { BaseService } from "@/services/base.service";

// Criando o modelo de pessoa como reativo
const pessoa = reactive(new PessoaModel());
const baseService = new BaseService<PessoaModel>('/pessoas');
let listaPessoas = ref([]);
const nome = ref('');
const documento = ref('');

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
  baseService.create(pessoa).then(res => {
    if (res.status === 201) {
      pessoa.documento = '  ';
      pessoa.nome = '';
      snackbar.value = true;
    }
  });
};

const buscarPessoas = async () => {
  console.log(nome.value);
  console.log(documento.value);
  
  
  if ((nome.value != '' && nome.value != null) || (documento.value != '' && documento.value != null)) {
    let data: any =[];
    if (nome.value != '' && nome.value != null) {data.push({chave: 'nome', valor: nome.value})}
    if (documento.value != '' && documento.value != null) {data.push({chave: 'documento', valor: documento.value})}
    
    await baseService.getBy(data).then(res => {
      if (res.status === 200) {
        listaPessoas.value = res.data;
      }
    });
  } else {
    await baseService.getAll().then(res => {
      if (res.status === 200) {
        listaPessoas.value = res.data;
      }
    });
  }
}

const aplicaMascara = () => {
  caracteresDocumento.value = documentoSelecionado.value === 'cpf' ? 14 : 13;
  documentoSelecionado.value === 'cpf' ? applyCpfMask(pessoa) : applyRgMask(pessoa);
}

// const baseService = new BaseService<PessoaModel>('/pessoas');
// baseService.getAll().then(res => {
//   console.log(res.data);
// });
</script>

<style scoped>
.v-container {
  max-width: 80vw;
}
</style>
