<template>
  <div class="landing">
    <h1 class="page-title">World Health Organization Dashboard</h1>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/global-styles.scss";

.landing {
  background-color: $background-color;
  min-width: 94vw;

  .page-title {
    background-color: $reset-background;
    border-bottom: solid $border-width $title-border-color;
    display: flex;
    margin: 0 auto;
    padding: 11px;
  }
}
</style>
