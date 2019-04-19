<template>
  <div id="app">
    <navigation-bar class="nav" />
    <router-view class="content" />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  }
};
</script>

<style lang="scss">
@import "./assets/global-styles.scss";

#app {
  display: flex;
  font-family: $font-family;
  text-align: center;

  .nav {
    background-color: $who-blue;
    display: flex;
    flex-direction: column;
    margin-right: 6px;
    max-width: 10vw;
    min-height: 100vh;
  }

  .content {
    max-width: 90vw;
  }
}
</style>
