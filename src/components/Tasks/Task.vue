<template>
  <q-item
    v-touch-hold:1000.mouse="showEditTaskModal"
    clickable
    :class="task.completed ? 'bg-green-1' : 'bg-orange-1'"
    @click="update()"
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox class="no-pointer-events" :value="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strikethrough': task.completed }"
        v-html="$options.filters.searchHighlight(task.name, search)"
      ></q-item-label>
    </q-item-section>

    <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center ">
          <q-icon class="q-mr-xs" name="event" size="18px" />
        </div>

        <div class="column">
          <q-item-label class="row justify-end" caption>
            {{ task.dueDate | niceDate }}
          </q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{ taskDueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          flat
          round
          color="primary"
          icon="edit"
          dense
        />
        <q-btn
          @click.stop="promtDelete(id)"
          flat
          round
          color="red"
          icon="delete"
          dense
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task :task="task" :id="id" @closeDialog="showEditTask = false" />
    </q-dialog>
  </q-item>
</template>

<script>
import { date } from "quasar";
import { mapActions, mapState, mapGetters } from "vuex";
import EditTaskVue from "./modals/EditTask.vue";

const { formatDate } = date;

export default {
  components: {
    editTask: EditTaskVue
  },
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
      showEditTask: false
    };
  },
  computed: {
    ...mapState("tasks", ["search"]),
    ...mapGetters("settings", ["settings"]),
    taskDueTime() {
      if (this.settings.show12HourTimeFormat)
        return formatDate(this.task.dueDate + " " + this.task.dueTime, "h:mmA");
      return this.task.dueTime;
    }
  },
  filters: {
    niceDate(value) {
      return formatDate(value, "MMM Do, YYYY");
    },
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, "ig");
        // read about regexp
        return value.replace(
          searchRegExp,
          match => `<span class="bg-yellow-6">${match}</span>`
        );
      }

      return value;
    }
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    update() {
      const { id, task } = this;
      const updateTo = {
        id,
        updates: { ...task, completed: !task.completed }
      };
      this.updateTask(updateTo);
    },
    promtDelete() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really delete?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(this.id);
        });
    },
    showEditTaskModal() {
      this.showEditTask = true;
    }
  }
};
</script>

<style></style>
