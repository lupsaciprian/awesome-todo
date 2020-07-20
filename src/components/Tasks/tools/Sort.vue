<template>
  <q-select
    filled
    v-model="sortByModel"
    :options="options"
    class="q-ml-sm"
    label="Sort by"
    stack-label
    emit-value
    map-options
  />
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      options: [
        { label: "Name", value: "name" },
        { label: "Date", value: "dueDate" }
      ]
    };
  },
  computed: {
    ...mapState("tasks", ["sortBy"]),
    sortByModel: {
      get() {
        return this.sortBy;
      },
      set(value) {
        this.setSortBy(value);
      }
    }
  },
  methods: {
    ...mapActions("tasks", ["setSortBy"])
  }
};
</script>

<style scoped>
.q-select {
  flex: 0 0 112px;
}
</style>
