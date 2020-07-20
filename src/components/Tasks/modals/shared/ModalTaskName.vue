<template>
  <div class="row q-mb-sm">
    <q-input
      class="col"
      outlined
      v-select-text
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task Name"
      lazy-rules
      :rules="[val => !!val || 'Field is required']"
    />
  </div>
</template>

<script>
import { selectText } from "src/directives/directive-select-text";

export default {
  props: {
    name: {
      type: String,
      default: null
    }
  },
  directives: {
    selectText
  }
};
</script>

<style></style>
