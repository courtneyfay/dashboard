<template>
  <div class="health">
    <h1 class="page-title dark-bottom-border">Health Data</h1>
    <mortality-table class="table" />
  </div>
</template>

<script>
import MortalityTable from "../components/health/MortalityTable";

export default {
  components: {
    MortalityTable
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
}
</style>
