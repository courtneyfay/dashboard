<template>
  <label class="toggle-button">
    <input
      type="checkbox"
      class="toggle-input"
      :checked="value"
      :disabled="disabled"
      @click="toggle"
    />
    <div class="toggle-background" :style="buttonBackground">
      <div
        :class="['toggle-button', isToggled ? 'slide-right' : 'slide-left']"
      ></div>
      <span :class="['label', isToggled ? 'left' : 'right']">{{
        buttonText
      }}</span>
    </div>
  </label>
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
      buttonText: this.options[0],
      isToggled: false
    };
  },
  methods: {
    toggle() {
      this.buttonText =
        this.buttonText === this.options[0] ? this.options[1] : this.options[0];

      this.isToggled = !this.isToggled;

      this.$emit("update", this.buttonText);
    }
  },
  computed: {
    buttonBackground() {
      //TODO: change these into scss variables, $who-blue and $dark-who-blue
      const backgroundColor = this.isToggled ? "#3499d8" : "#185981";

      return {
        backgroundColor
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/global-styles.scss";

.toggle-button {
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  position: relative;
  vertical-align: middle;

  .toggle-input {
    opacity: 0;
  }

  .toggle-background {
    border-radius: 20px;
    box-sizing: border-box;
    display: block;
    height: 30px;
    margin: 0;
    position: relative;
    width: 110px;

    .toggle-button {
      background-color: $white;
      border-radius: 100%;
      display: block;
      height: 20px;
      left: 5px;
      overflow: hidden;
      position: absolute;
      top: 5px;
      width: 20px;
      z-index: 2;

      &.slide-right {
        transition: transform 300ms;
        transform: translate(80px);
      }

      &.slide-left {
        transition: transform 300ms;
      }
    }

    .label {
      color: white;
      font-weight: 500;
      position: absolute;
      top: 5px;
      z-index: 1;

      &.left {
        left: 10px;
      }

      &.right {
        right: 10px;
      }
    }
  }
}
</style>
