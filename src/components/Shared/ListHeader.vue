<template>
  <q-banner
    :class="headingClasses"
    inline-actions
    class="list-header text-white text-center"
  >
    <span v-once class="text-bold text-subtitle1">{{ title }}</span>
  </q-banner>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    headingClasses: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
.list-header {
  border-radius: 5px;
}
</style>
