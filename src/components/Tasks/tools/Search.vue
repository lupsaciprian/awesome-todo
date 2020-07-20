<template>
  <q-input
    bottom-slots
    v-model="searchInput"
    v-select-text
    @keyup.esc="searchInput = ''"
    label="Search Todo"
    class="col"
    outlined
  >
    <template v-slot:append>
      <q-icon
        v-if="searchInput !== ''"
        name="close"
        @click="searchInput = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { selectText } from "src/directives/directive-select-text";

export default {
  computed: {
    ...mapState("tasks", ["search"]),
    searchInput: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  directives: { selectText },
  methods: {
    ...mapActions("tasks", ["setSearch"])
  }
};
</script>

<style scoped>
.q-input {
  padding-bottom: 0;
}
</style>
