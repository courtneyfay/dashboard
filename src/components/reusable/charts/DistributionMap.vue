<template>
  <div class="map">
    <h3>{{ title }}</h3>
    <!-- <geo-chart :data="data" ></geo-chart> -->
    <!-- adapter="google" -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Map"
    },
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  border: solid 1px red;
  height: 91%;
  width: 40%;
}
</style>
