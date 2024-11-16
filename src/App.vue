<template>
  <v-app>
    <!-- BARRA DO TOPO -->
    <v-app-bar app dark prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Sistema de Gestão de Acesso :: SGA</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- BARRA LATERAL -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :location="$vuetify.display.mobile ? 'bottom' : 'left'"
      temporary
    >
      <v-list density="compact">

        <v-list-subheader>HOME</v-list-subheader>
        <v-list-item
        color="secondary"
        @click="goToPage('/')">
          <template v-slot:prepend>
            <font-awesome-icon :icon="['fas', 'home']" class="mr-5"/>
          </template>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>


        <v-list-subheader>REGISTRO</v-list-subheader>
        <v-list-item
          color="secondary"
          @click="goToPage('/entradas')">
          <template v-slot:prepend>
            <font-awesome-icon :icon="['fas', 'sign-in']" class="mr-5"/>
          </template>
          <v-list-item-title>Entradas</v-list-item-title>
        </v-list-item>

        <v-list-item
          color="secondary"
          @click="goToPage('/saidas')">
          <template v-slot:prepend>
            <font-awesome-icon :icon="['fas', 'sign-out']" class="mr-5"/>
          </template>
          <v-list-item-title>Saídas</v-list-item-title>
        </v-list-item>


        <v-list-subheader>CADASTROS</v-list-subheader>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          color="secondary"
          @click="goToPage(item.value)"
        >
          <template v-slot:prepend>
            <font-awesome-icon :icon="['fas', item.icon]" class="mr-5"/>
          </template>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const drawer = ref(false);
    const items = ref([
      { text: 'Pessoas', icon: 'users', value: '/pessoas' },
      { text: 'Veículos', icon: 'car', value: '/veiculos' },
      { text: 'Empresas', icon: 'building', value: '/empresas' },
      { text: 'Controladores', icon: 'user', value: '/controladores' }
    ]);

    const router = useRouter();

    const goToPage = (page: string) => {
      if (page) {
        router.push(`${page}`);
      }
    };

    return {
      drawer,
      items,
      goToPage,
    };
  },
});
</script>

<style>
font-awesome-icon {
  margin-right: 5px;
}
</style>
