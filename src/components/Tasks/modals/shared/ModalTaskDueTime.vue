<template>
  <div class="row q-mb-sm">
    <q-input
      clearable
      class="col"
      outlined
      :value="dueTime"
      @input="$emit('update:dueTime', $event)"
      label="Due time"
    >
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy
            ref="qTimeProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time :value="dueTime" @input="pickerValueChanged" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: {
    dueTime: {
      type: String,
      default: null
    }
  },
  methods: {
    pickerValueChanged($e) {
      this.$emit("update:dueTime", $e);
      this.$refs.qTimeProxy.hide();
    }
  }
};
</script>

<style></style>
