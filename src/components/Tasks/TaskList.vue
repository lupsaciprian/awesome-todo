<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated absolute-top zoomOut"
  >
    <div :class="{ 'q-mt-lg': !showTasksInOneList }">
      <list-header
        v-if="!showTasksInOneList"
        :title="title"
        :headingClasses="headingClasses"
      />

      <q-list bordered separator>
        <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key" />
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import TaskVue from "./Task.vue";
import ListHeaderVue from "../Shared/ListHeader.vue";

export default {
  components: {
    task: TaskVue,
    listHeader: ListHeaderVue
  },
  computed: {
    ...mapGetters("settings", ["settings"]),
    showTasksInOneList() {
      return this.settings.showTasksInOneList;
    }
  },
  props: {
    tasks: {
      type: Object,
      required: true
    },
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

<style></style>
