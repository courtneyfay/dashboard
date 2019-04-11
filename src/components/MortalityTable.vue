<template>
  <div>
    <h3>Adult Mortality Rates for 2016 By Region</h3>
    <table>
      <tr class="headers">
        <th></th>
        <th>Country</th>
        <th>Life Expectancy</th>
        <th>Air Pollution</th>
        <th>Disease</th>
        <th>Hygiene</th>
        <th>Poisoning</th>
        <th>Suicide</th>
      </tr>
      <tr v-for="(country, key) in countries" :key="key">
        <td>FLAG</td>
        <td>{{ country.name }}</td>
        <td>{{ country.lifeExpectancy }}</td>
        <td>{{ country.airPollution }}</td>
        <td>{{ country.disease }}</td>
        <td>{{ country.hygiene }}</td>
        <td>{{ country.poisoning }}</td>
        <td>{{ country.suicide }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    countries() {
      return this.$store.state.mortalityData;
    }
  }
};
</script>

<style lang="scss" scoped>
.headers {
  background-color: lightblue;
}
</style>
