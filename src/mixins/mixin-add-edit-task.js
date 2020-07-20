import ModalHeadingVue from "src/components/Tasks/modals/shared/ModalHeading.vue";
import ModalTaskNameVue from "src/components/Tasks/modals/shared/ModalTaskName.vue";
import ModalTaskDueDateVue from "src/components/Tasks/modals/shared/ModalTaskDueDate.vue";
import ModalTaskDueTimeVue from "src/components/Tasks/modals/shared/ModalTaskDueTime.vue";
import ModalButtonsVue from "src/components/Tasks/modals/shared/ModalButtons.vue";

export default {
  components: {
    modalHeading: ModalHeadingVue,
    modalTaskName: ModalTaskNameVue,
    modalDueDate: ModalTaskDueDateVue,
    modalDueTime: ModalTaskDueTimeVue,
    modalButtons: ModalButtonsVue
  },
  methods: {
    updateField($e) {
      this.taskToSubmit[$e.field] = $e.value;
    }
  }
};
