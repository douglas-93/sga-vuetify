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
            <v-text-field v-model="pessoa.nome" :rules="nameRules" clearable label="Nome" required variant="outlined"
                          @input="pessoa.nome = pessoa.nome.toUpperCase()"></v-text-field>
          </v-col>


          <v-col class="d-flex align-center justify-end flex-fill" cols="12" md="2">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-radio-group v-model="documentoSelecionado" inline @change="aplicaMascara">
              <v-radio label="RG" value="rg"></v-radio>
              <v-radio label="CPF" value="cpf"></v-radio>
            </v-radio-group>
          </v-col>


          <v-col cols="12" md="5">
            <v-text-field v-model="pessoa.documento" :maxlength="caracteresDocumento" clearable label="Documento" required
                          variant="outlined" @input="aplicaMascara"></v-text-field>
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
            <v-text-field v-model="nome" clearable label="Nome" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="documento" clearable label="Documento" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn @click="buscarPessoas()">Pesquisar</v-btn>
          </v-col>
        </v-row>

        <v-table v-if="listaPessoas.length > 0">
          <thead>
          <tr>
            <th class="text-center">
              Nome
            </th>
            <th class="text-center">
              Documento
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in listaPessoas" :key="item.id">
            <td>{{ item.nome }}</td>
            <td>{{ item.documento }}</td>
            <td>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text"></v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="(option, i) in items" :key="i" class="cursor-pointer">
                    <v-list-item-title @click="option.func(item.id)">{{ option.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
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
import {reactive, ref} from 'vue';
import {PessoaModel} from "@/models/pessoa.model";
import {applyCpfMask, applyRgMask} from "@/utils/formatadores";
import {BaseService} from "@/services/base.service";

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
const submitForm = async () => {
  if (!pessoa.id) {
    await baseService.create(pessoa).then(res => {
      if (res.status === 201) {
        Object.assign(pessoa, new PessoaModel());
        snackbar.value = true;
      }
    });
  } else {
    await baseService.update(pessoa).then(res => {
      if (res.status === 201) {
        Object.assign(pessoa, new PessoaModel());
        snackbar.value = true;
      }
    });
    buscarPessoas();
  }
};

const buscarPessoas = async () => {
  if ((nome.value != '' && nome.value != null) || (documento.value != '' && documento.value != null)) {
    let data: any = [];
    if (nome.value != '' && nome.value != null) {
      data.push({chave: 'nome', valor: nome.value})
    }
    if (documento.value != '' && documento.value != null) {
      data.push({chave: 'documento', valor: documento.value})
    }

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

const editar = (id: number) => {
  let p = listaPessoas.value.find((item) => item.id === id);
  pessoa.id = p.id;
  pessoa.nome = p.nome;
  pessoa.documento = p.documento;
  documentoSelecionado.value = pessoa.documento.length === 14 ? 'cpf' : 'rg';
}

const excluir = (id: number) => {
  console.log(id)
}

const items = [
  {title: 'Editar', func: editar},
  {title: 'Excluir', func: excluir},
];

const aplicaMascara = () => {
  caracteresDocumento.value = documentoSelecionado.value === 'cpf' ? 14 : 13;
  documentoSelecionado.value === 'cpf' ? applyCpfMask(pessoa) : applyRgMask(pessoa);
}

</script>

<style scoped>
.v-container {
  max-width: 80vw;
}
</style>
