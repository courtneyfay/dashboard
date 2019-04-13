<template>
  <div class="health">
    <h2>Health Data</h2>
    <mortality-table />
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
