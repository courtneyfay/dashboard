<template>
  <div class="page1">
    <h1>This is Page 1</h1>
    <div>{{ $store.state.data }}</div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch("requestBigQueryData");
  }
};
</script>
