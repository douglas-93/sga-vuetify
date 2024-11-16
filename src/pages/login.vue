<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-height="180"
      src="../assets/logo858x270.png"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>

      <v-text-field
        density="compact"
        placeholder="Informe seu usuário"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Senha
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Entre com sua senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
        class="mb-8"
        color="red"
        size="large"
        block
      >
        Log In
      </v-btn>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    visible: false,
  }),
}
</script>
