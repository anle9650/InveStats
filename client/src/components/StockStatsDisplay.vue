<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i class="bi bi-arrow-left-right text-secondary me-2"></i>
        Volume
      </span>
      <span>{{ stockVolume }}</span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i class="bi bi-arrow-up-circle me-2"></i>
        52 Week High
      </span>
      <span>${{ high52Week }}</span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i class="bi bi-arrow-down-circle me-2"></i>
        52 Week Low
      </span>
      <span>${{ low52Week }}</span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i
          :class="[
            getAnnualizedRate(5) >= 0 ? upGraph : downGraph,
            'flex-shrink-0',
            'me-2',
          ]"
        ></i>
        5 Year Annualized
      </span>
      <span>{{ getAnnualizedRate(5) }}%</span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i
          :class="[getAnnualizedRate(10) >= 0 ? upGraph : downGraph, 'me-2']"
        ></i>
        10 Year Annualized
      </span>
      <span>{{ getAnnualizedRate(10) }}%</span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i
          :class="[getAnnualizedRate() >= 0 ? upGraph : downGraph, 'me-2']"
        ></i>
        Total Annualized
      </span>
      <span>{{ getAnnualizedRate() }}%</span>
    </li>
  </ul>
</template>

<script>
const YEARLY_TRADING_DAYS = 253;
export default {
  name: "stock-stats-display",
  props: {
    dailyPrices: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      upGraph: "bi bi-graph-up",
      downGraph: "bi bi-graph-down",
    };
  },
  computed: {
    pastYearPrices() {
      return this.dailyPrices.slice(-YEARLY_TRADING_DAYS);
    },
    high52Week() {
      if (this.pastYearPrices.length === 0) return 0;
      let highPrice = Math.max.apply(
        Math,
        this.pastYearPrices.map((priceData) => priceData.close)
      );
      return highPrice.toFixed(2);
    },
    low52Week() {
      if (this.pastYearPrices.length === 0) return 0;
      let lowPrice = Math.min.apply(
        Math,
        this.pastYearPrices.map((priceData) => priceData.close)
      );
      return lowPrice.toFixed(2);
    },
    stockVolume() {
      if (this.dailyPrices.length === 0) return 0;
      return parseInt(this.dailyPrices.slice(-1)[0].volume).toLocaleString();
    },
  },
  methods: {
    getAnnualizedRate(years) {
      if (this.dailyPrices.length === 0) return 0;

      var startPrice;
      let endPrice = this.dailyPrices.slice(-1)[0].close;

      if (years === undefined) {
        let startYear = new Date(this.dailyPrices[0].date).getFullYear(),
          currentYear = new Date(
            this.dailyPrices.slice(-1)[0].date
          ).getFullYear();

        years = currentYear - startYear;
        startPrice = this.dailyPrices[0].open;
      } else
        startPrice = this.dailyPrices.slice(-YEARLY_TRADING_DAYS * years)[0]
          .open;

      let rate = endPrice / startPrice,
        annualizedRate = (Math.pow(rate, 1 / years) - 1) * 100;
      return annualizedRate.toFixed(2);
    },
  },
};
</script>