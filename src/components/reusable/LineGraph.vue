<template>
  <line-chart
    :colors="['#185981']"
    :data="values"
    :min="minimum"
    :max="maximum"
    height="80px"
    :library="options"
    width="100%"
  ></line-chart>
</template>

<script>
export default {
  props: {
    values: {
      type: Object,
      default: () => {}
    },
    minimum: {
      type: Number,
      default: 0
    },
    maximum: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      options: {
        scales: {
          xAxes: [
            {
              //removes grid lines and border of chart
              gridLines: {
                display: false,
                drawBorder: false
              },
              //removes values along axes
              ticks: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    };
  }
};
</script>
