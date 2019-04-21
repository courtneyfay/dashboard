<template>
  <div>
    <div class="mortality-header light-bottom-border">
      <h2 class="section-title">Adult Mortality Rates for 2016 By Region</h2>
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
          <th class="small-column"></th>
          <th @click="sortData(COUNTRY)" class="medium-column clickable">
            <sort-arrows
              :ascending="ascending"
              :sortedBy="sortBy === COUNTRY"
            />COUNTRY
          </th>
          <th @click="sortData(LIFE_EXPECTANCY)" class="large-column clickable">
            <sort-arrows
              class="sort-arrows"
              :ascending="ascending"
              :sortedBy="sortBy === LIFE_EXPECTANCY"
            />LIFE EXPECTANCY
            <div>(in years)</div>
          </th>
          <th class="life-expectancy">
            LIFE EXPECTANCY
            <div>(1960 - 2016)</div>
          </th>
          <th @click="sortData(DISEASE)" class="large-column clickable">
            <sort-arrows
              class="sort-arrows"
              :ascending="ascending"
              :sortedBy="sortBy === DISEASE"
            />CVD, CANCER, DIABETES, CRD
          </th>
          <th @click="sortData(AIR_POLLUTION)" class="large-column clickable">
            <sort-arrows
              class="sort-arrows"
              :ascending="ascending"
              :sortedBy="sortBy === AIR_POLLUTION"
            />AIR POLLUTION
            <div>(per 100,000)</div>
          </th>
          <th @click="sortData(HYGIENE)" class="medium-column clickable">
            <sort-arrows
              class="sort-arrows"
              :ascending="ascending"
              :sortedBy="sortBy === HYGIENE"
            />SANITATION
            <div>(per 100,000)</div>
          </th>
          <th @click="sortData(POISON)" class="medium-column clickable">
            <sort-arrows
              class="sort-arrows"
              :ascending="ascending"
              :sortedBy="sortBy === POISON"
            />POISONING
            <div>(per 100,000)</div>
          </th>
          <th @click="sortData(SUICIDE)" class="medium-column clickable">
            <sort-arrows
              class="sort-arrows"
              :ascending="ascending"
              :sortedBy="sortBy === SUICIDE"
            />SUICIDE
            <div>(per 100,000)</div>
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
      <tbody v-else :class="scrollableClass">
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
          <td class="left-justify">{{ country.name }}</td>
          <td>{{ $formats.roundToTwoDecimals(country.lifeExpectancy) }}</td>
          <td>
            <line-graph
              :values="country.lineChart"
              :minimum="calcMinimum(country.lineChart)"
              :maximum="calcMaximum(country.lineChart)"
            />
          </td>
          <td class="medium-column">
            <div v-if="country.disease">
              <pie-chart
                class="center-justify"
                :percentages="calcPiePercentages(country.disease)"
              />
              <div>{{ $formats.addPercent(country.disease) }}</div>
            </div>
            <div v-else>--</div>
          </td>
          <td class="medium-column">
            {{ $formats.checkNulls(country.airPollution) }}
          </td>
          <td class="medium-column">
            {{ $formats.checkNulls(country.hygiene) }}
          </td>
          <td class="medium-column">
            {{ $formats.checkNulls(country.poisoning) }}
          </td>
          <td class="medium-column">
            {{ $formats.checkNulls(country.suicide) }}
          </td>
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
    countriesData() {
      return this.$store.state.mortalityData;
    },
    regions() {
      return maps.regions;
    },
    scrollableClass() {
      return this.countriesData && Object.keys(this.countriesData).length > 4
        ? "scrollable"
        : "null";
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
    calcMinimum(lifeExpectancies) {
      let exactMin;

      Object.keys(lifeExpectancies).forEach(date => {
        const lifeExpectancyValue = lifeExpectancies[date];

        //set the exactMin to the first number if it is undefined
        if (!exactMin) {
          exactMin = lifeExpectancyValue;
        }

        //get the lowest value to plot the minimum
        if (lifeExpectancyValue < exactMin) {
          exactMin = lifeExpectancyValue;
        }
      });

      //round the lowest value down to the nearest 5
      return Math.floor(exactMin / 5) * 5;
    },
    calcMaximum(lifeExpectancies) {
      let exactMax;

      Object.keys(lifeExpectancies).forEach(date => {
        const lifeExpectancyValue = lifeExpectancies[date];

        //set the exactMin to the first number if it is undefined
        if (!exactMax) {
          exactMax = lifeExpectancyValue;
        }

        //get the lowest value to plot the minimum
        if (lifeExpectancyValue > exactMax) {
          exactMax = lifeExpectancyValue;
        }
      });

      //round the highest value up to the nearest 5
      return Math.ceil(exactMax / 5) * 5;
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

  .dropdown-controls {
    align-items: center;
    display: flex;

    .dropdown {
      padding: 11px;
    }
  }
}

.mortality-table {
  border-collapse: border;
  table-layout: fixed;
  width: 100%;

  .medium-column {
    width: 11%;
  }

  .headers {
    color: $table-header-color;
    display: block;
    font-size: $table-header-size;
    font-weight: normal;

    th {
      border-bottom: solid $border-width $subtitle-border-color;
      padding: 6px 0;
    }

    .sort-arrows {
      float: left;
    }

    .large-column {
      width: 14%;
    }

    .small-column {
      width: 3%;
    }

    .clickable {
      cursor: pointer;
    }
  }

  .scrollable {
    display: block;
    overflow-y: auto;
    height: 600px;
    width: 100%;
  }
}
</style>
