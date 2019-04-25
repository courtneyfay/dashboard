<template>
  <div class="health">
    <h1 class="page-title dark-bottom-border">Health Data</h1>
    <obesity-graphs class="graphs" />
    <mortality-table class="table" />
  </div>
</template>

<script>
import MortalityTable from "../components/health/MortalityTable";
import ObesityGraphs from "../components/health/ObesityGraphs";

export default {
  components: {
    MortalityTable,
    ObesityGraphs
  },
  beforeMount() {
    this.$store.dispatch("requestMortalityData", "TEA");
    this.$store.dispatch("requestObesityData");
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

  .graphs {
    background-color: $white;
    margin: 30px;
  }
}
</style>
