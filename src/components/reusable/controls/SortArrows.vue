<template>
  <span>
    <span v-if="sortedBy && ascending">
      <div class="invisible-desc-arrow"></div>
      <div class="asc-arrow"></div>
    </span>
    <span v-else-if="sortedBy && !ascending">
      <div class="desc-arrow"></div>
      <div class="invisible-asc-arrow"></div>
    </span>
    <span v-else>
      <div class="desc-arrow"></div>
      <div class="asc-arrow"></div>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    ascending: {
      type: Boolean
    },
    sortedBy: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/global-styles.scss";

.asc-arrow {
  //triangle pointing down
  border-top: 8px solid $dark-who-blue;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  height: 0;
  width: 0;
}
.desc-arrow {
  //triangle pointing up
  border-bottom: 8px solid $dark-who-blue;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  height: 0;
  margin-bottom: 3px;
  width: 0;
}
.invisible-desc-arrow {
  border-bottom: 8px solid transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  height: 0;
  margin-bottom: 3px;
  width: 0;
}
.invisible-asc-arrow {
  border-top: 8px solid transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  height: 0;
  width: 0;
}
</style>
