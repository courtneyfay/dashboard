<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Page 1</router-link>|
      <router-link to="/2">Page 2</router-link>|
      <router-link to="/3">Page 3</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  text-align: center;
}
</style>
