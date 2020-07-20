<template>
  <q-card>
    <modal-heading>Add Task</modal-heading>

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
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  mixins: [mixinAddEditTask],
  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitForm($e) {
      this.addTask(this.taskToSubmit);

      this.$emit("closeDialog");
    }
  }
};
</script>

<style></style>
