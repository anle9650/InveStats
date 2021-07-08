<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 mb-4">
        <div class="shadow card">
          <div class="card-body">
            <stock-line-graph :symbol="currentSymbol"></stock-line-graph>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="shadow card">
          <div class="card-body">
            <h5 class="card-title">Stocks</h5>
          </div>
          <stocks-list :symbols="symbols" @select-stock="setCurrentData"></stocks-list>
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
      stocks: [
        {
          symbol: "IBM", 
          intradayPrices: [],
          dailyPrices: []
        },
        {
          symbol: "TSCO.LON", 
          intradayPrices: [],
          dailyPrices: []
        },
        {
          symbol: "SHOP.TRT", 
          intradayPrices: [],
          dailyPrices: []
        },
        {
          symbol: "GPV.TRV", 
          intradayPrices: [],
          dailyPrices: []
        },
        {
          symbol: "DAI.DEX", 
          intradayPrices: [],
          dailyPrices: []
        },
      ],
      currentSymbol: "IBM",
      currentIntraDayPrices: [],
      currentdailyPrices: [],
      options: {
        legend: false,
      },
      series: [44, 55, 41, 17, 15],
    };
  },
  computed: {
    symbols() {
      let symbols = [];
      this.stocks.forEach(stock => symbols.push(stock.symbol));
      return symbols;
    }
  },
  methods: {
    async fetchIntradayPrices(symbol) {
      const json = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=demo`
      )
        .then((response) => response.json())
        .catch((error) => {
          throw error;
        });
      let priceData = [];
      for (var datetime in json["Time Series (5min)"]) {
        priceData.push({
          x: new Date(datetime.replace(/-/g, "/")).getTime(),
          y: json["Time Series (5min)"][datetime]["4. close"],
        });
      }
      priceData = priceData.sort((a, b) => a.x - b.x);
      return priceData;
    },
    async fetchDailyPrices(symbol) {
      const json = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=demo`
      )
        .then((response) => response.json())
        .catch((error) => {
          throw error;
        });
      let priceData = [];
      for (var datetime in json["Time Series (Daily)"]) {
        priceData.push({
          x: new Date(datetime.replace(/-/g, "/")).getTime(),
          y: json["Time Series (Daily)"][datetime]["4. close"],
        });
      }
      priceData = priceData.sort((a, b) => a.x - b.x);
      return priceData;
    },
    setCurrentData(symbol) {
      let currentStockIndex = this.stocks.findIndex(stock => stock.symbol === symbol);

      if (this.stocks[currentStockIndex].intradayPrices.length === 0) {
        this.fetchIntradayPrices(symbol).then(intradayPrices => this.stocks[currentStockIndex].intradayPrices = intradayPrices);
        this.fetchDailyPrices(symbol).then(dailyPrices => this.stocks[currentStockIndex].dailyPrices = dailyPrices);
      }
      this.currentSymbol = symbol;
      this.currentIntraDayPrices = this.stocks[currentStockIndex].intradayPrices;
      this.currentdailyPrices = this.stocks[currentStockIndex].dailyPrices;
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
