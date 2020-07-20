import { LocalStorage } from "quasar";

const state = {
  settings: {
    show12HourTimeFormat: false,
    showTasksInOneList: false
  }
};

const getters = {
  settings: state => {
    return state.settings;
  }
};

const mutations = {
  setShow12HourTimeFormat(state, value) {
    state.settings.show12HourTimeFormat = value;
  },
  setShowTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value;
  },
  getPersistentSettings(state, settings) {
    Object.assign(state.settings, settings);
  }
};

const actions = {
  setShow12HourTimeFormat({ commit, dispatch }, value) {
    commit("setShow12HourTimeFormat", value);
    dispatch("persistSettings");
  },
  setShowTasksInOneList({ commit, dispatch }, value) {
    commit("setShowTasksInOneList", value);
    dispatch("persistSettings");
  },
  persistSettings({ state }) {
    LocalStorage.set("settings", state.settings);
  },
  getPersistentSettings({ commit }) {
    const settings = LocalStorage.getItem("settings");
    if (settings) commit("getPersistentSettings", settings);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
