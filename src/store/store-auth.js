import { LocalStorage, Loading, QSpinnerHourglass } from "quasar";

import { firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error";

const state = {
  user: null,
  loggedIn: false
};

const getters = {};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
    LocalStorage.set("loggedIn", value);
  }
};

const actions = {
  registerUser({}, payload) {
    Loading.show({
      spinner: QSpinnerHourglass
    });

    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log("Resp", response);
      })
      .catch(err => {
        showErrorMessage(err.message);
      });
  },
  loginUser({}, payload) {
    Loading.show({
      spinner: QSpinnerHourglass
    });

    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log("Resp", response);
      })
      .catch(err => {
        showErrorMessage(err.message);
      });
  },
  handleAuthChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide();
      if (user) {
        // User is signed in.
        commit("setLoggedIn", true);
        // console.log(this.$router);
        this.$router.push("/");

        dispatch("tasks/fsReadTasks", null, { root: true });
      } else {
        commit("setLoggedIn", false);
        commit("tasks/setTasksLoaded", false, { root: true });
        commit("tasks/clearTasks", null, { root: true });
        this.$router.replace("/auth");
      }
    });
  },
  logoutUser({ commit }) {
    firebaseAuth.signOut();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
