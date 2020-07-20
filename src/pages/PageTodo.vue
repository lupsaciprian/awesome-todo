<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksLoaded">
        <div class="row q-mb-sm">
          <search />
          <sort />
        </div>

        <p
          v-if="
            search &&
              !Object.keys(tasksTodo).length &&
              !Object.keys(tasksCompleted).length
          "
        >
          No search results.
        </p>

        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          class="q-scroll-area-tasks"
        >
          <!-- <div class="relative-position"> -->
          <no-tasks
            v-if="!Object.keys(tasksTodo).length && !search"
            @showAddTask="showAddTask = true"
          />

          <task-list
            v-if="Object.keys(tasksTodo).length"
            :tasks="tasksTodo"
            title="To do"
            headingClasses="bg-orange-4"
          />
          <task-list
            v-if="Object.keys(tasksCompleted).length"
            :tasks="tasksCompleted"
            title="Completed"
            headingClasses="bg-green-4"
          />
          <!-- </div> -->
        </q-scroll-area>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner-hourglass color="primary" size="4em" />
        </span>
      </template>
    </div>

    <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
        class="all-pointer-events"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @closeDialog="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import TaskVue from "../components/Tasks/Task.vue";
import AddTaskVue from "../components/Tasks/modals/AddTask.vue";
import TaskListVue from "../components/Tasks/TaskList.vue";
import NoTasksVue from "../components/Tasks/NoTasks.vue";
import SearchVue from "../components/Tasks/tools/Search.vue";
import SortVue from "../components/Tasks/tools/Sort.vue";

export default {
  components: {
    addTask: AddTaskVue,
    taskList: TaskListVue,
    noTasks: NoTasksVue,

    search: SearchVue,
    sort: SortVue
  },
  data() {
    return {
      showAddTask: false,

      contentStyle: {
        color: "#555"
      },

      contentActiveStyle: {
        backgroundColor: "#eee",
        color: "black"
      },

      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      }
    };
  },
  computed: {
    ...mapGetters(`tasks`, ["tasksTodo", "tasksCompleted"]),
    ...mapState(`tasks`, ["search", "tasksLoaded"])
  },
  methods: {},
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  }
};
</script>

<style scoped>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
