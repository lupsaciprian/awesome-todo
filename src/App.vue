<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    console.log(this.$q.platform);
    if (this.$q.platform.is.electron)
      require("electron").ipcRenderer.on("show-settings", () => {
        this.$router.push("/settings");
      });

    this.getPersistentSettings();
    this.handleAuthChange();
  },
  methods: {
    ...mapActions("settings", ["getPersistentSettings"]),
    ...mapActions("auth", ["handleAuthChange"])
  }
};
</script>

<style lang="scss">
.text-strikethrough {
  text-decoration: line-through;
}
</style>
