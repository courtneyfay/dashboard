<template>
  <div>
    <div class="obesity-header">
      <h2 class="section-title light-bottom-border">{{ obesityTitle }}</h2>
    </div>
    <div class="white content">
      <distribution-map
        class="distribution-map"
        :title="mapTitle"
        :data="obesityData"
      />
      <div class="toggles">
        <toggle-button />
        <toggle-button />
      </div>
      <horizontal-bar-chart
        class="bar-chart"
        :title="chartTitle"
        :data="obesityData"
      />
    </div>
  </div>
</template>

<script>
import DistributionMap from "../reusable/charts/DistributionMap";
import HorizontalBarChart from "../reusable/charts/HorizontalBarChart";
import ToggleButton from "../reusable/controls/ToggleButton";

export default {
  data() {
    return {
      chartTitle: "Country Ranking By Percentage",
      mapTitle: "Distribution Map",
      //TODO: change these with the toggle buttons
      isHighest: true,
      isMale: true
    };
  },
  components: {
    DistributionMap,
    HorizontalBarChart,
    ToggleButton
  },
  computed: {
    obesityTitle() {
      let amplitude, gender;

      if (this.isHighest) {
        amplitude = "Highest";
      } else {
        amplitude = "Lowest";
      }

      if (this.isMale) {
        gender = "Males";
      } else {
        gender = "Females";
      }

      return `Countries with ${amplitude} Adult Overweight Populations In ${gender} For 2016`;
    },
    obesityData() {
      const raw = this.$store.state.obesityData;
      let data;

      if (this.isHighest && this.isMale) {
        data = raw.highestMale;
      } else if (this.isHighest && !this.isMale) {
        data = raw.highestFemale;
      } else if (!this.isHighest && this.isMale) {
        data = raw.lowestMale;
      } else if (!this.isHighest && !this.isMale) {
        data = raw.lowestFemale;
      }

      if (data) {
        data = data.map(country => {
          return [country.name, country.percentage];
        });
      }

      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/global-styles.scss";

.obesity-header {
  width: 100%;
}

.content {
  display: flex;
  height: 400px;
  justify-content: space-between;

  .distribution-map {
    margin-left: 2%;
  }

  .toggles {
    display: flex;
    flex-direction: column;
    height: 50%;
    justify-content: space-between;
    margin-top: 7%;
  }

  .bar-chart {
    margin-right: 2%;
  }
}
</style>
