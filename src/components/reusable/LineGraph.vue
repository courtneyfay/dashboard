<template>
  <line-chart
    :data="values"
    :min="minimum"
    :max="maximum"
    height="1%"
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
  }
};
</script>
