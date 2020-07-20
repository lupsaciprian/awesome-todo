<template>
  <div class="row q-mb-sm">
    <q-input
      clearable
      class="col"
      outlined
      :value="dueDate"
      @input="$emit('update:dueDate', $event)"
      label="Due date"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date :value="dueDate" @input="pickerValueChanged" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: {
    dueDate: {
      type: String,
      default: null
    }
  },
  methods: {
    pickerValueChanged($e) {
      this.$emit("update:dueDate", $e);
      this.$refs.qDateProxy.hide();
    }
  }
};
</script>

<style></style>
