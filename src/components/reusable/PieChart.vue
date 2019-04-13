<template>
  <pie-chart
    :data="percentages"
    :colors="['#b00', '#666']"
    :legend="false"
    :library="{ tooltips: { enabled: false } }"
    height="30px"
    suffix="%"
    width="30px"
  ></pie-chart>
</template>

<script>
export default {
  props: {
    percentages: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
