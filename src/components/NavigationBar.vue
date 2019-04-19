<template>
  <div class="navbar-items">
    <router-link to="/">
      <img
        class="logo"
        src="../assets/WHO-logo.png"
        alt="World Health Organization logo"
      />
    </router-link>
    <router-link to="/health">
      <font-awesome-icon
        aria-label="Health Data link"
        class="icon"
        icon="medkit"
        title="Health Data link"
      />
    </router-link>
    <router-link to="/education">
      <font-awesome-icon
        aria-label="Education Data link"
        class="icon"
        icon="book-reader"
        title="Education Data link"
      />
    </router-link>
    <router-link to="/economics">
      <font-awesome-icon
        aria-label="Economics Data link"
        class="icon"
        icon="money-bill"
        title="Economics Data link"
      />
    </router-link>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/global-styles.scss";
.navbar-items {
  .logo {
    border-bottom: solid $border-width $logo-border-color;
    height: 60px;
    width: 60px;
  }

  .icon {
    color: $white;
    height: 45px;
    margin: 15px 0;
    width: 45px;
  }
}
</style>
