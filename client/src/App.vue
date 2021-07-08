<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 mb-4">
        <div class="shadow card">
          <div class="card-body">
            <stock-line-graph :symbol="symbol"></stock-line-graph>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="shadow card">
          <div class="card-body">
            <h5 class="card-title">Stocks</h5>
          </div>
          <stocks-list :stocks="stocks" @select-stock="setSymbol"></stocks-list>
          <apexchart
            type="donut"
            :options="options"
            :series="series"
            @data-point-selection="mouseOver"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StockLineGraph from "./components/StockLineGraph";
import StocksList from "./components/StocksList";
export default {
  name: "App",
  components: {
    StockLineGraph,
    StocksList,
  },
  data() {
    return {
      stocks: ["IBM", "TSCO.LON"],
      symbol: "IBM",
      options: {
        legend: false,
      },
      series: [44, 55, 41, 17, 15],
    };
  },
  methods: {
    setSymbol(symbol) {
      this.symbol = symbol;
    },
    mouseOver(event, chartContext, config) {
      console.log(event);
      console.log(chartContext);
      console.log(config);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
