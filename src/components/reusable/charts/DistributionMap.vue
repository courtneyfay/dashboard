<template>
  <div class="map">
    <h3>{{ title }}</h3>
    <geo-chart
      :data="data"
      :colors="['#3499d8', '#185981']"
      adapter="google"
    ></geo-chart>
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
  height: 91%;
  width: 40%;
}
</style>
