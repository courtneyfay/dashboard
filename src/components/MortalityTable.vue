<template>
  <div>
    <div>
      <h3 class="left">Adult Mortality Rates for 2016 By Region</h3>
      <div>
        <span>Regions:</span>
        <dropdown
          class="right"
          :options="REGIONS"
          :value="'TEA'"
          @update="updateRegion"
        />
      </div>
    </div>

    <table>
      <tr class="headers">
        <th></th>
        <th>Country</th>
        <th>Life Expectancy at birth (in years)</th>
        <th>Mortality from CVD, Cancer, Diabetes or CRD (%)</th>
        <th>Mortality from Air Pollution (per 100,000)</th>
        <th>
          Mortality from Unsafe Water, Sanitation, and Lack of Hygiene (per
          100,000)
        </th>
        <th>Mortality from Poisoning (per 100,000)</th>
        <th>Mortality from Suicide (per 100,000)</th>
      </tr>
      <tr v-for="(country, key) in countries" :key="key">
        <td>FLAG</td>
        <td>{{ country.name }}</td>
        <td>{{ country.lifeExpectancy }}</td>
        <td>{{ country.disease }} %</td>
        <td>{{ country.airPollution }}</td>
        <td>{{ country.hygiene }}</td>
        <td>{{ country.poisoning }}</td>
        <td>{{ country.suicide }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Dropdown from "../components/SingleSelectDropdown";

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      REGIONS: {
        TEA: "East Asia & Pacific",
        TEC: "Europe & Central Asia",
        TLA: "Latin America & Caribbean",
        TMN: "Middle East & North Africa",
        TSA: "South Asia",
        TSS: "Sub-saharan Africa",
        NAC: "North America"
      }
    };
  },
  computed: {
    countries() {
      return this.$store.state.mortalityData;
    }
  },
  methods: {
    updateRegion(region) {
      console.log("region", region);
      //call action to refresh data with new region
      this.$store.dispatch("requestMortalityData", region);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/global-styles.css";

.headers {
  background-color: lightblue;
}
</style>
