<template>
  <v-navigation-drawer
    v-model="localDrawer"
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
</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
// const drawer = ref(false);
const items = ref([
  {text: 'Pessoas', icon: 'users', value: '/pessoas'},
  {text: 'Veículos', icon: 'car', value: '/veiculos'},
  {text: 'Empresas', icon: 'building', value: '/empresas'},
  {text: 'Controladores', icon: 'user', value: '/controladores'}
]);

const props = defineProps<{
  drawer: boolean;
}>();
const emit = defineEmits(["update:drawer"]);

// Local drawer state to sync with parent
const localDrawer = ref(props.drawer);

// Watch for changes and emit updates
watch(localDrawer, (newValue) => {
  emit("update:drawer", newValue);
});

// Sync prop changes from parent
watch(
  () => props.drawer,
  (newVal) => {
    localDrawer.value = newVal;
  }
);

const goToPage = (page: string) => {
  if (page) {
    router.push(`${page}`);
  }
};

</script>

<style scoped>
font-awesome-icon {
  margin-right: 5px;
}
</style>
