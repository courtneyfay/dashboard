<template>
  <div class="health">
    <h1 class="page-title dark-bottom-border">Health Data</h1>
    <new-health-component class="new" />
    <mortality-table class="table" />
  </div>
</template>

<script>
import MortalityTable from "../components/health/MortalityTable";
import NewHealthComponent from "../components/health/NewHealthComponent";

export default {
  components: {
    MortalityTable,
    NewHealthComponent
  },
  beforeMount() {
    this.$store.dispatch("requestMortalityData", "TEA");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/global-styles.scss";

.health {
  background-color: $background-color;
  min-width: 93vw;

  .page-title {
    background-color: $reset-background;
    display: flex;
    margin: 0;
    padding: 11px;
  }

  .table {
    background-color: $white;
    margin: 30px;
  }

  .new {
    background-color: $white;
    margin: 30px;
  }
}
</style>
