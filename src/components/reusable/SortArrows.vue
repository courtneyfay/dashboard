<template>
  <div class="orange" :class="ascending ? 'asc' : 'desc'"></div>
</template>

<script>
export default {
  props: {
    ascending: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.asc {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid darkblue;
}

.desc {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid darkblue;
}
</style>
