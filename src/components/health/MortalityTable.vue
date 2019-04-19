<template>
  <div>
    <div class="mortality-header light-bottom-border">
      <h2 class="table-title">Adult Mortality Rates for 2016 By Region</h2>
      <div class="dropdown-controls">
        <label for="dropdown" class="dropdown-label"></label>
        Regions:
        <dropdown
          class="dropdown"
          :options="regions"
          :value="'TEA'"
          @update="updateRegion"
        />
      </div>
    </div>

    <table class="mortality-table">
      <thead>
        <tr class="headers">
          <th class="flag"></th>
          <th @click="sortData(COUNTRY)" class="country">
            COUNTRY
            <sort-arrows v-if="sortBy === COUNTRY" :ascending="ascending" />
          </th>
          <th @click="sortData(LIFE_EXPECTANCY)" class="number-data">
            LIFE EXPECTANCY
            <div>(in years)</div>
            <sort-arrows
              v-if="sortBy === LIFE_EXPECTANCY"
              :ascending="ascending"
            />
          </th>
          <th class="life-expectancy">
            LIFE EXPECTANCY
            <div>(1960 - 2016)</div>
          </th>
          <th @click="sortData(DISEASE)" class="number-data">
            CVD, CANCER, DIABETES, CRD
            <div>(%)</div>
            <sort-arrows v-if="sortBy === DISEASE" :ascending="ascending" />
          </th>
          <th @click="sortData(AIR_POLLUTION)" class="number-data">
            AIR POLLUTION
            <div>(per 100,000)</div>
            <sort-arrows
              v-if="sortBy === AIR_POLLUTION"
              :ascending="ascending"
            />
          </th>
          <th @click="sortData(HYGIENE)" class="number-data">
            SANITATION
            <div>(per 100,000)</div>
            <sort-arrows v-if="sortBy === HYGIENE" :ascending="ascending" />
          </th>
          <th @click="sortData(POISON)" class="number-data">
            POISONING
            <div>(per 100,000)</div>
            <sort-arrows v-if="sortBy === POISON" :ascending="ascending" />
          </th>
          <th @click="sortData(SUICIDE)" class="number-data">
            SUICIDE
            <div>(per 100,000)</div>
            <sort-arrows v-if="sortBy === SUICIDE" :ascending="ascending" />
          </th>
        </tr>
      </thead>
      <tbody v-if="!countriesData || this.isLoading">
        <tr>
          <td colspan="9">
            <img src="../../assets/loader.gif" alt="This content is loading" />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(country, key) in countriesData" :key="key" class="data">
          <td>
            <img
              v-if="countryKey(key)"
              :src="
                `https://www.countryflags.io/${countryKey(key)}/flat/32.png`
              "
              :alt="`${country.name} flag`"
            />
          </td>
          <td>{{ country.name }}</td>
          <td class="indent">
            {{ $formats.roundToTwoDecimals(country.lifeExpectancy) }}
          </td>
          <td>
            <line-graph
              :values="country.lineChart"
              :minimum="calcMinimum"
              :maximum="calcMaximum"
            />
          </td>
          <td class="indent">
            <div v-if="country.disease">
              <pie-chart :percentages="calcPiePercentages(country.disease)" />
              <span>{{ $formats.addPercent(country.disease) }}</span>
            </div>
            <div v-else>--</div>
          </td>
          <td class="indent">
            {{ $formats.checkNulls(country.airPollution) }}
          </td>
          <td class="indent">{{ $formats.checkNulls(country.hygiene) }}</td>
          <td class="indent">{{ $formats.checkNulls(country.poisoning) }}</td>
          <td class="indent">{{ $formats.checkNulls(country.suicide) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Dropdown from "../reusable/SingleSelectDropdown";
import maps from "../../maps";
import LineGraph from "../reusable/LineGraph";
import orderBy from "lodash.orderby";
import PieChart from "../reusable/PieChart";
import SortArrows from "../reusable/SortArrows";

export default {
  components: {
    Dropdown,
    LineGraph,
    PieChart,
    SortArrows
  },
  data() {
    return {
      COUNTRY: "name",
      LIFE_EXPECTANCY: "lifeExpectancy",
      DISEASE: "disease",
      AIR_POLLUTION: "airPollution",
      HYGIENE: "hygiene",
      POISON: "poisoning",
      SUICIDE: "suicide",
      ascending: true,
      sortBy: "name",
      isLoading: false
    };
  },
  computed: {
    calcMinimum() {
      //get the lowest value to plot the minimum
      const exactMin = this.valuesArray.reduce((min, num) => {
        return num < min ? num : min;
      });

      //round the lowest value down to the nearest 5
      return Math.floor(exactMin / 5) * 5;
    },
    calcMaximum() {
      //get the highest value to plot the maximum
      const exactMax = this.valuesArray.reduce((max, num) => {
        return num > max ? num : max;
      });

      //round the highest value up to the nearest 5
      return Math.ceil(exactMax / 5) * 5;
    },
    countriesData() {
      return this.$store.state.mortalityData;
    },
    valuesArray() {
      //pull the life expectancy values out of the countries' lineChart objects
      //to calculate minimum and maximum for all charts on the page
      const array = [];
      Object.keys(this.countriesData).forEach(country => {
        const lineChart = this.countriesData[country].lineChart;

        Object.keys(lineChart).forEach(year => {
          const value = lineChart[year];
          array.push(value);
        });
      });

      return array;
    },
    regions() {
      return maps.regions;
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
      return maps.flagMap[key];
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
    async updateRegion(region) {
      this.isLoading = true;

      try {
        await this.$store.dispatch("requestMortalityData", region);
        this.isLoading = false;
        this.sortBy = "name";
        this.ascending = true;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/global-styles.scss";

.mortality-header {
  display: flex;
  justify-content: space-between;

  .table-title {
    margin: 0;
    padding: 11px;
  }

  .dropdown-controls {
    align-items: center;
    display: flex;

    .dropdown {
      padding: 11px;
    }
  }
}

.mortality-table {
  width: 100%;

  .headers {
    color: $table-header-color;
    font-size: $table-header-size;
    font-weight: normal;

    th {
      border-bottom: solid $border-width $subtitle-border-color;
      padding: 6px 0;
    }

    .flag {
      width: 3%;
    }

    .country {
      width: 12%;
    }

    .number-data {
      width: 10%;
    }
  }

  .data {
    text-align: left;

    .indent {
      padding-left: 3%;
    }
  }
}
</style>
