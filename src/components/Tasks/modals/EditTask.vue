<template>
  <q-card>
    <modal-heading>Edit Task</modal-heading>

    <q-form
      ref="addTaskForm"
      @submit="submitForm"
      class="q-gutter-md"
      autofocus
      greedy
    >
      <q-card-section class="q-pt-none">
        <modal-task-name :name.sync="taskToSubmit.name"></modal-task-name>

        <modal-due-date :dueDate.sync="taskToSubmit.dueDate" />

        <modal-due-time
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
        />
      </q-card-section>

      <modal-buttons />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixins/mixin-add-edit-task";

export default {
  mixins: [mixinAddEditTask],
  props: {
    task: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      taskToSubmit: {},
      formValid: true
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitForm($e) {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });

      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  }
};
</script>

<style></style>
