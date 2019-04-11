<template>
  <div id="app">
    <h1>World Health Organization</h1>
    <div id="nav">
      <router-link to="/">Health Data</router-link>|
      <router-link to="/education">Education Data</router-link>|
      <router-link to="/economics">Economic Data</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  text-align: center;
}
</style>
