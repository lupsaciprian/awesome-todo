<template>
  <q-page padding>
    <q-card class="auth-tabs">
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="login">
          <div class="text-h6">Login</div>
          <login-register :tab="activeTab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <div class="text-h6">Register</div>
          <login-register :tab="activeTab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import LoginRegisterVue from "../components/Auth/LoginRegister.vue";

export default {
  components: {
    loginRegister: LoginRegisterVue
  },
  data() {
    return {
      activeTab: "login"
    };
  }
};
</script>

<style scoped>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>
