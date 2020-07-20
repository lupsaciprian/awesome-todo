import Vue from "vue";
import { Notify } from "quasar";

import { firebaseDb, firebaseAuth } from "boot/firebase";

import { showErrorMessage } from "src/functions/function-show-error";

const state = {
  tasks: {},
  search: "",
  sortBy: "dueDate",
  tasksLoaded: false
};

const getters = {
  tasksSorted(state) {
    let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks);

    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sortBy].toLowerCase(),
        taskBProp = state.tasks[b][state.sortBy].toLowerCase();

      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      return 0;
    });

    keysOrdered.forEach(key => (tasksSorted[key] = state.tasks[key]));

    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted;
    if (state.search) {
      let filteredTasks = {};
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key];
        if (task.name.toLowerCase().includes(state.search.toLowerCase())) {
          filteredTasks[key] = task;
        }
      });

      return filteredTasks;
    } else {
      return tasksSorted;
    }

    // return filteredTasks;
  },
  tasksTodo: (state, getters) => {
    let tasksTodo = {};
    let filteredTasks = getters.tasksFiltered;
    Object.keys(filteredTasks).forEach(key => {
      if (!filteredTasks[key].completed) tasksTodo[key] = filteredTasks[key];
    });
    return tasksTodo;
  },
  tasksCompleted: (state, getters) => {
    let tasksCompleted = {};
    let filteredTasks = getters.tasksFiltered;
    Object.keys(filteredTasks).forEach(key => {
      if (filteredTasks[key].completed)
        tasksCompleted[key] = filteredTasks[key];
    });
    return tasksCompleted;
  }
};

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
    console.log(state.tasks[payload.id]);
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSortBy(state, value) {
    state.sortBy = value;
  },
  setTasksLoaded(state, value) {
    state.tasksLoaded = value;
  },
  clearTasks(state) {
    state.tasks = {};
  }
};

const actions = {
  updateTask({ dispatch }, payload) {
    dispatch("fsUpdateTask", payload);
  },
  deleteTask({ dispatch }, id) {
    dispatch("fsDeleteTask", id);
  },
  addTask({ dispatch }, payload) {
    dispatch("fsAddTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSortBy({ commit }, value) {
    commit("setSortBy", value);
  },
  fsReadTasks({ commit }) {
    const usersRef = firebaseDb.collection("users");
    const currentUserId = firebaseAuth.currentUser.uid;

    usersRef
      .doc(currentUserId)
      .collection("tasks")
      .onSnapshot(
        querySnapshot => {
          commit("setTasksLoaded", true);
          querySnapshot.forEach(doc => {
            const payload = {
              id: doc.id,
              task: doc.data()
            };
            commit("addTask", payload);
          });

          querySnapshot.docChanges().forEach(change => {
            if (change.type === "removed") {
              commit("deleteTask", change.doc.id);
            }
          });
        },
        err => {
          showErrorMessage(err.message);
          commit("setTasksLoaded", true);
          this.$router.replace("/auth");
        }
      );

    // You need to unsubscribe this to prevent memory leaks!
    // var unsubscribe = db.collection("cities")
    // unsubscribe()
  },
  fsAddTask({}, payload) {
    const usersRef = firebaseDb.collection("users");
    const currentUserId = firebaseAuth.currentUser.uid;

    usersRef
      .doc(currentUserId)
      .collection("tasks")
      .add(payload)
      .then(docRef => {
        Notify.create("Task created!");
      })
      .catch(err => {
        showErrorMessage(err.message);
      });
  },
  fsDeleteTask({}, taskId) {
    const usersRef = firebaseDb.collection("users");
    const currentUserId = firebaseAuth.currentUser.uid;

    usersRef
      .doc(currentUserId)
      .collection("tasks")
      .doc(taskId)
      .delete()
      .then(docRef => {
        Notify.create("Task deleted!");
      })
      .catch(err => {
        showErrorMessage(err.message);
      });
  },
  fsUpdateTask({}, payload) {
    const usersRef = firebaseDb.collection("users");
    const currentUserId = firebaseAuth.currentUser.uid;

    usersRef
      .doc(currentUserId)
      .collection("tasks")
      .doc(payload.id)
      .set(payload.updates)
      .then(docRef => {
        const keys = Object.keys(payload.updates);
        console.log(keys);
        if (keys.length > 1) Notify.create("Task updated!");
      })
      .catch(err => {
        showErrorMessage(err.message);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
