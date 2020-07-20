<template>
  <q-form ref="registerForm" @submit="onSubmit" class="q-gutter-md">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} to access your Todos anywhere
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
        class="col"
        lazy-rules
        :rules="[
          val => isValidEmail(val) || 'Please enter a valid email adress'
        ]"
        outlined
        v-model="formData.email"
        label="Email"
        stack-label
      />
    </div>

    <div class="row q-mb-md">
      <q-input
        class="col"
        type="password"
        lazy-rules
        :rules="[
          val =>
            (val && val.length >= 6) ||
            'The password must contain at least 6 characters.'
        ]"
        outlined
        v-model="formData.password"
        label="Password"
        stack-label
      />
    </div>

    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" :label="tab | titleCase"></q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    tab: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),
    isValidEmail(email) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    },
    onSubmit($e) {
      this.$refs.registerForm.validate().then(success => {
        if (this.tab === "login") {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      });
    }
  }
};
</script>

<style></style>
