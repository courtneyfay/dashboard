<template>
  <button class="toggle" @click="toggle">{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      buttonText: this.options[0]
    };
  },
  methods: {
    toggle() {
      if (this.buttonText === this.options[0]) {
        this.buttonText = this.options[1];
      } else {
        this.buttonText = this.options[0];
      }

      this.$emit("update", this.buttonText);
    }
  }
};
</script>

<style lang="scss" scoped>
.toggle {
  border: solid 1px red;
  height: 60px;
  width: 100px;
}
</style>
