<template>
  <div class="bar-chart">
    <h3>{{ title }}</h3>
    <bar-chart
      :data="data"
      :colors="['#3499d8']"
      :library="options"
    ></bar-chart>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Bar Chart"
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                autoSkip: false,
                autoSkipPadding: 10
              }
            }
          ]
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.bar-chart {
  height: 91%;
  width: 40%;
}
</style>
