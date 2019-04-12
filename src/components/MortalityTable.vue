<template>
  <div>
    <div class="row">
      <h3 class="column">Adult Mortality Rates for 2016 By Region</h3>
      <div class="column">
        <div class="row">
          <span class="column">Regions:</span>
          <dropdown class="column" :options="regions" :value="'TEA'" @update="updateRegion"/>
        </div>
      </div>
    </div>

    <table class="mortality-table">
      <tr class="headers">
        <th class="flag"></th>
        <th @click="sortData(COUNTRY)" class="country">
          Country
          <sort-arrows v-if="sortBy === COUNTRY" :ascending="ascending"/>
        </th>
        <th @click="sortData(LIFE_EXPECTANCY)" class="number-data">
          Life Expectancy at birth
          <sort-arrows v-if="sortBy === LIFE_EXPECTANCY" :ascending="ascending"/>
        </th>
        <th class="life-expectancy"></th>
        <th @click="sortData(DISEASE)" class="number-data">
          Mortality from CVD, Cancer, Diabetes or CRD
          <sort-arrows v-if="sortBy === DISEASE" :ascending="ascending"/>
        </th>
        <th @click="sortData(AIR_POLLUTION)" class="number-data">
          Mortality from Air Pollution
          <sort-arrows v-if="sortBy === AIR_POLLUTION" :ascending="ascending"/>
        </th>
        <th @click="sortData(HYGIENE)" class="number-data">
          Mortality from Unsafe Water, Sanitation, and Lack of Hygiene
          <sort-arrows v-if="sortBy === HYGIENE" :ascending="ascending"/>
        </th>
        <th @click="sortData(POISON)" class="number-data">
          Mortality from Poisoning
          <sort-arrows v-if="sortBy === POISON" :ascending="ascending"/>
        </th>
        <th @click="sortData(SUICIDE)" class="number-data">
          Mortality from Suicide
          <sort-arrows v-if="sortBy === SUICIDE" :ascending="ascending"/>
        </th>
      </tr>
      <tr class="sub-headers">
        <th></th>
        <th></th>
        <th>(in years)</th>
        <th></th>
        <th>(%)</th>
        <th>(per 100,000)</th>
        <th>(per 100,000)</th>
        <th>(per 100,000)</th>
        <th>(per 100,000)</th>
      </tr>
      <tr v-for="(country, key) in countriesData" :key="key" class="data">
        <td>
          <img
            v-if="countryKey(key)"
            :src="`https://www.countryflags.io/${countryKey(key)}/flat/32.png`"
            :alt="country.name"
          >
        </td>
        <td>{{ country.name }}</td>
        <td class="indent">{{ $formats.roundToTwoDecimals(country.lifeExpectancy) }}</td>
        <td class="indent">NO GRAPH AVAILABLE</td>
        <td class="indent">
          <div v-if="country.disease">
            <pie-chart :percentages="calcPiePercentages(country.disease)"/>
            <span>{{ $formats.addPercent(country.disease) }}</span>
          </div>
          <div v-else>--</div>
        </td>
        <td class="indent">{{ $formats.checkNulls(country.airPollution) }}</td>
        <td class="indent">{{ $formats.checkNulls(country.hygiene) }}</td>
        <td class="indent">{{ $formats.checkNulls(country.poisoning) }}</td>
        <td class="indent">{{ $formats.checkNulls(country.suicide) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Dropdown from "../components/SingleSelectDropdown";
import PieChart from "../components/PieChart";
import SortArrows from "../components/SortArrows";
import orderBy from "lodash.orderby";
import flagMap from "../maps";

export default {
  components: {
    Dropdown,
    PieChart,
    SortArrows
  },
  data() {
    return {
      regions: {
        TEA: "East Asia & Pacific",
        TEC: "Europe & Central Asia",
        TLA: "Latin America & Caribbean",
        TMN: "Middle East & North Africa",
        TSA: "South Asia",
        TSS: "Sub-saharan Africa",
        NAC: "North America"
      },
      COUNTRY: "name",
      LIFE_EXPECTANCY: "lifeExpectancy",
      DISEASE: "disease",
      AIR_POLLUTION: "airPollution",
      HYGIENE: "hygiene",
      POISON: "poisoning",
      SUICIDE: "suicide",
      sortBy: "name",
      ascending: true
    };
  },
  computed: {
    countriesData() {
      return this.$store.state.mortalityData;
    }
  },
  methods: {
    calcPiePercentages(percentage) {
      if (!percentage) return {};
      return {
        fatal: percentage,
        "non-fatal": 100 - percentage
      };
    },
    countryKey(key) {
      //TODO: figure out how to get these from being nested
      return flagMap.flagMap[key];
    },
    sortData(sort) {
      if (this.sortBy === sort) {
        //if it's the same column, flip the order
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortBy = sort;
      }
      const sortDir = this.ascending ? "asc" : "desc";
      const sortedData = orderBy(
        this.countriesData,
        [`${this.sortBy}`],
        [`${sortDir}`]
      );

      this.$store.commit("updateMortalityData", sortedData);
    },
    updateRegion(region) {
      //turn on loader
      this.$store.dispatch("requestMortalityData", region).then(() => {
        //reset sort arrows
        this.sortBy = "name";
        this.ascending = true;
        //turn off loader
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mortality-table {
  width: 100%;

  .headers {
    background-color: lightblue;

    .flag {
      width: 5%;
    }

    .country {
      width: 15%;
    }

    .number-data {
      width: 10%;
    }
  }

  .sub-headers {
    background-color: lightblue;
  }

  .data {
    text-align: left;

    .indent {
      padding-left: 3%;
    }
  }
}
</style>
