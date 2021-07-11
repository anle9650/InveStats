<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 mt-4">
        <div class="shadow card">
          <div class="card-body d-flex">
            <div class="flex-shrink-0">
              <i class="bi bi-graph-up"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h5 class="card-title">${{ high52Week }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">52 Week High</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 mt-4">
        <div class="shadow card">
          <div class="card-body d-flex">
            <div class="flex-shrink-0">
              <i class="bi bi-graph-down"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h5 class="card-title">${{ low52Week }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">52 Week Low</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 mt-4">
        <div class="shadow card">
          <div class="card-body d-flex">
            <div class="flex-shrink-0">
              <i :class="[priceYTD >= 0 ? upArrow : downArrow]"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h5 class="card-title">
                {{ priceYTD >= 0 ? "+" : "-" }}${{ Math.abs(priceYTD) }} ({{
                  Math.abs(percentYTD)
                }}%)
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">Year to Date</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 mt-4">
        <div class="shadow card">
          <div class="card-body d-flex">
            <div class="flex-shrink-0">
              <i :class="[priceSinceInception >= 0 ? upArrow : downArrow]"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h5 class="card-title">
                {{ priceSinceInception >= 0 ? "+" : "-" }}${{
                  Math.abs(priceSinceInception)
                }}
                ({{ Math.abs(percentSinceInception) }}%)
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">Since Inception</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 mt-4">
        <div
          class="shadow card"
          v-if="
            selectedIntradayPrices.length != 0 &&
            selectedDailyPrices.length != 0
          "
        >
          <div class="card-body">
            <stock-line-graph
              :name="selectedSymbol"
              :intradayPrices="selectedIntradayPrices"
              :dailyPrices="selectedDailyPrices"
            ></stock-line-graph>
          </div>
        </div>
        <transition :duration="{ enter: 5000, leave: 0 }">
          <div
            v-if="
              selectedIntradayPrices.length === 0 ||
              selectedDailyPrices.length === 0
            "
            class="alert alert-danger"
            role="alert"
          >
            Maximum API calls exceeded. Please try again in 5 minutes, or use
            demo stock (IBM).
          </div>
        </transition>
      </div>
      <div class="col-lg-4 mt-4">
        <div class="shadow card">
          <div class="card-body">
            <h5 class="card-title mt-2">
              <span class="d-flex w-100 justify-content-between">
                Stocks 
                <button type="button" class="btn btn-outline-secondary btn-sm"><i class="bi bi-search"></i></button>
              </span>
            </h5>
          </div>
          <stocks-list
            :symbols="allSymbols"
            :stockShares="allStockShares"
            :startPrices="startPricesToday"
            :endPrices="endPricesToday"
            @select-stock="(index) => (currentStockIndex = index)"
          ></stocks-list>
          <apexchart
            type="donut"
            :options="donutChartOptions"
            :series="allStockHoldings"
            @data-point-selection="
              (event, chartContext, config) =>
                (currentStockIndex = config.dataPointIndex)
            "
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StockLineGraph from "./components/StockLineGraph";
import StocksList from "./components/StocksList";
const YEARLY_TRADING_DAYS = 253;
export default {
  name: "App",
  components: {
    StockLineGraph,
    StocksList,
  },
  data() {
    return {
      upArrow: "bi bi-arrow-up-circle-fill",
      downArrow: "bi bi-arrow-down-circle-fill",
      stocks: [
        {
          symbol: "IBM",
          shares: 2,
          intradayPrices: [],
          dailyPrices: [],
        },
        {
          symbol: "TSCO.LON",
          shares: 1,
          intradayPrices: [],
          dailyPrices: [],
        },
        {
          symbol: "SHOP.TRT",
          shares: 1,
          intradayPrices: [],
          dailyPrices: [],
        },
      ],
      currentStockIndex: 0,
      donutChartOptions: {
        title: {
          text: "Holdings Summary",
          align: "Center",
        },
        labels: [],
        legend: false,
        tooltip: {
          y: {
            formatter: (value) => "$" + value,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: "Total Holdings",
                  formatter: (w) => {
                    return (
                      "$" +
                      w.globals.seriesTotals
                        .reduce((a, b) => {
                          return a + b;
                        }, 0)
                        .toFixed(2)
                    );
                  },
                },
              },
            },
          },
        },
      },
    };
  },
  created() {
    // Fetch stock price data.
    let fetchPromises = [];
    this.stocks.forEach((stock) => {
      let shortenedSymbol = stock.symbol.split(".")[0];
      fetchPromises.push(
        this.fetchIntradayPrices(shortenedSymbol).then((intradayPrices) => {
          stock.intradayPrices = intradayPrices;
        })
      );
      fetchPromises.push(
        this.fetchDailyPrices(stock.symbol).then((dailyPrices) => {
          stock.dailyPrices = dailyPrices;
        })
      );
    });
    Promise.all(fetchPromises);

    // Set donut chart labels.
    this.donutChartOptions = {
      ...this.donutChartOptions,
      ...{
        labels: this.allSymbols,
      },
    };
  },
  computed: {
    allSymbols() {
      return this.stocks.map((stock) => stock.symbol);
    },
    selectedSymbol() {
      return this.stocks[this.currentStockIndex].symbol;
    },
    selectedIntradayPrices() {
      return this.stocks[this.currentStockIndex].intradayPrices;
    },
    selectedDailyPrices() {
      return this.stocks[this.currentStockIndex].dailyPrices;
    },
    pastYearPrices() {
      return this.selectedDailyPrices.slice(-YEARLY_TRADING_DAYS);
    },
    high52Week() {
      if (this.pastYearPrices.length > 0) {
        let highPrice = Math.max.apply(
          Math,
          this.pastYearPrices.map((priceData) => priceData.y)
        );
        return highPrice;
      }
      return 0;
    },
    low52Week() {
      if (this.pastYearPrices.length > 0) {
        let lowPrice = Math.min.apply(
          Math,
          this.pastYearPrices.map((priceData) => priceData.y)
        );
        return lowPrice;
      }
      return 0;
    },
    priceYTD() {
      if (this.pastYearPrices.length > 0) {
        let yearStartPrice = this.pastYearPrices[0].y,
          yearEndPrice = this.pastYearPrices.slice(-1)[0].y;
        return (yearEndPrice - yearStartPrice).toFixed(2);
      }
      return 0;
    },
    percentYTD() {
      if (this.pastYearPrices.length > 0) {
        let yearStartPrice = this.pastYearPrices[0].y,
          yearEndPrice = this.pastYearPrices.slice(-1)[0].y;
        return (
          ((yearEndPrice - yearStartPrice) / yearStartPrice) *
          100
        ).toFixed(2);
      }
      return 0;
    },
    priceSinceInception() {
      if (this.selectedDailyPrices.length > 0) {
        let startPrice = this.selectedDailyPrices[0].y,
          endPrice = this.selectedDailyPrices.slice(-1)[0].y;
        return (endPrice - startPrice).toFixed(2);
      }
      return 0;
    },
    percentSinceInception() {
      if (this.selectedDailyPrices.length > 0) {
        let startPrice = this.selectedDailyPrices[0].y,
          endPrice = this.selectedDailyPrices.slice(-1)[0].y;
        return (((endPrice - startPrice) / startPrice) * 100).toFixed(2);
      }
      return 0;
    },
    allStockShares() {
      let allStockShares = this.stocks.map((stock) => {
        if (stock.shares) return stock.shares;
        return 0;
      });
      return allStockShares;
    },
    startPricesToday() {
      let startPrices = this.stocks.map((stock) => {
        if (stock.intradayPrices.length > 0) {
          let startPrice = stock.intradayPrices[0].y;
          return startPrice;
        }
        return 0;
      });
      return startPrices;
    },
    endPricesToday() {
      let endPrices = this.stocks.map((stock) => {
        if (stock.intradayPrices.length > 0) {
          let endPrice = stock.intradayPrices.slice(-1)[0].y;
          return endPrice;
        }
        return 0;
      });
      return endPrices;
    },
    allStockHoldings() {
      let prices = this.stocks.map((stock) => {
        if (stock.intradayPrices.length > 0) {
          let currentPrice = stock.intradayPrices.slice(-1)[0].y;
          return stock.shares * currentPrice;
        }
        return 0;
      });
      return prices;
    },
  },
  methods: {
    async fetchIntradayPrices(symbol) {
      const json = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${
          symbol === "IBM" ? "demo" : "1V4VMMH8KUPV4I15"
        }`
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
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${
          symbol === "IBM" || symbol === "TSCO.LON" || symbol === "SHOP.TRT"
            ? "demo"
            : "1V4VMMH8KUPV4I15"
        }`
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
  },
};
</script>

<style>
.bi-graph-up, .bi-arrow-up-circle-fill {
  color: green;
}
.bi-graph-down, .bi-arrow-down-circle-fill {
  color: red;
}
</style>

<style scoped>
.bi-graph-up, .bi-graph-down, .bi-arrow-up-circle-fill, .bi-arrow-down-circle-fill {
  font-size: 2rem;
}
</style>
