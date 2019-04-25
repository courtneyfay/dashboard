<template>
  <div class="single-select-dropdown">
    <select @input="emit" v-model="selected" name="dropdown">
      <option v-for="(option, key) in options" :key="key" :value="key">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    value: null
  },
  data() {
    return {
      selected: null
    };
  },
  mounted() {
    this.selected = this.value;
  },
  watch: {
    value(newValue) {
      this.selectedOption = newValue;
    }
  },
  methods: {
    emit(e) {
      const key = e.target.value;
      this.$emit("update", key);
    }
  }
};
</script>

<style lang="scss" scoped></style>
