<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-3">
        <div class="shadow card">
          <div class="card-body d-flex">
            <div class="flex-shrink-0">
              <i class="bi bi-arrow-up-circle"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h5 class="card-title">${{ high52Week }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">52 Week High</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="shadow card">
          <div class="card-body d-flex">
            <div class="flex-shrink-0">
              <i class="bi bi-arrow-down-circle"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h5 class="card-title">${{ low52Week }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">52 Week Low</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="shadow card">
          <div class="card-body d-flex">
            <div class="flex-shrink-0">
              <!-- <i :class="[priceYTD >= 0 ? upGraph : downGraph]"></i> -->
            </div>
            <div class="flex-grow-1 ms-3">
              <h5 class="card-title">
                <!-- {{ priceYTD >= 0 ? "+" : "-" }}${{ Math.abs(priceYTD) }} ({{
                  Math.abs(percentYTD)
                }}%) -->
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">Year to Date</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="shadow card">
          <div class="card-body d-flex">
            <div class="flex-shrink-0">
              <i :class="[priceSinceInception >= 0 ? upGraph : downGraph]"></i>
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
    <div class="row mt-4">
      <div class="col-lg-8">
        <div
          class="d-flex justify-content-center"
          v-if="loading && selectedIntradayPrices.length === 0"
        >
          <div class="spinner-border me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span>Loading...</span>
        </div>
        <div
          class="shadow card mb-3"
          v-if="
            selectedIntradayPrices.length != 0 &&
            selectedDailyPrices.length != 0
          "
        >
          <div class="card-body">
            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                v-show="graphType == 'StockLineGraph'"
                @click="graphType = 'StockCandlestick'"
              >
                <i class="bi bi-align-center"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                v-show="graphType == 'StockCandlestick'"
                @click="graphType = 'StockLineGraph'"
              >
                <i
                  class="bi bi-graph-up"
                  style="color: unset; font-size: unset"
                ></i>
              </button>
            </div>
            <transition name="slide-fade">
              <component
                :is="graphType"
                :name="selectedSymbol"
                :intradayPrices="
                  graphType == 'StockLineGraph'
                    ? lineGraphIntradayPrices
                    : candlestickIntradayPrices
                "
                :dailyPrices="
                  graphType == 'StockLineGraph'
                    ? lineGraphDailyPrices
                    : candlestickDailyPrices
                "
                :timeframe="timeframe"
              ></component>
            </transition>
            <div class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="timeframe = 'pastDay'"
              >
                1D
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="timeframe = 'pastWeek'"
              >
                1W
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="timeframe = 'MTD'"
              >
                MTD
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="timeframe = 'pastMonth'"
              >
                1M
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="timeframe = 'YTD'"
              >
                YTD
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="timeframe = 'pastYear'"
              >
                1Y
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="timeframe = 'past5Years'"
              >
                5Y
              </button>
            </div>
          </div>
        </div>
        <transition name="slide-fade">
          <div
            v-if="
              !loading &&
              (selectedIntradayPrices.length === 0 ||
                selectedDailyPrices.length === 0)
            "
            class="alert alert-danger"
            role="alert"
          >
            Maximum API calls exceeded. Please try again in 60 seconds, or use
            demo stock (IBM).
          </div>
        </transition>
        <div class="row">
          <div class="col-lg-6">
            <div class="shadow card mb-3">
              <div class="card-body">
                <h5 class="card-title">Stats</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  {{ selectedSymbol }}
                </h6>
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item d-flex w-100 justify-content-between"
                  >
                    <span>
                      <i class="bi bi-arrow-left-right me-2"></i>
                      Volume
                    </span>
                    <span>{{ stockVolume }}</span>
                  </li>
                  <li
                    class="list-group-item d-flex w-100 justify-content-between"
                  >
                    <span>
                      <i class="bi bi-arrow-up-circle me-2"></i>
                      52 Week High
                    </span>
                    <span>${{ high52Week }}</span>
                  </li>
                  <li
                    class="list-group-item d-flex w-100 justify-content-between"
                  >
                    <span>
                      <i class="bi bi-arrow-down-circle me-2"></i>
                      52 Week Low
                    </span>
                    <span>${{ low52Week }}</span>
                  </li>
                  <li
                    class="list-group-item d-flex w-100 justify-content-between"
                  >
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
                  <li
                    class="list-group-item d-flex w-100 justify-content-between"
                  >
                    <span>
                      <i
                        :class="[
                          getAnnualizedRate(10) >= 0 ? upGraph : downGraph,
                          'me-2',
                        ]"
                      ></i>
                      10 Year Annualized
                    </span>
                    <span>{{ getAnnualizedRate(10) }}%</span>
                  </li>
                  <li
                    class="list-group-item d-flex w-100 justify-content-between"
                  >
                    <span>
                      <i
                        :class="[
                          getAnnualizedRate() >= 0 ? upGraph : downGraph,
                          'me-2',
                        ]"
                      ></i>
                      Total Annualized
                    </span>
                    <span>{{ getAnnualizedRate() }}%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="shadow card mb-3">
              <div class="card-body">
                <apexchart
                  type="donut"
                  :options="donutChartOptions"
                  :series="allStockHoldings"
                  @data-point-selection="
                    (event, chartContext, config) =>
                      (selectedStockIndex = config.dataPointIndex)
                  "
                ></apexchart>
              </div>
            </div>
          </div>
        </div>
        <stock-news-carousel class="shadow mb-3" :stockSymbol="selectedSymbol"></stock-news-carousel>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <stock-search
            :stocksOwned="allSymbols"
            :stockShares="allStockShares"
            @buy-stock="addShares"
            @sell-stock="removeShares"
          ></stock-search>
        </div>
        <div class="shadow card mb-3">
          <div class="card-body">
            <h5 class="card-title">Stocks</h5>
          </div>
          <stocks-list
            :symbols="allSymbols"
            :stockShares="allStockShares"
            :startPrices="startPricesPastDay"
            :endPrices="endPricesPastDay"
            @select-stock="(index) => (selectedStockIndex = index)"
            @buy-stock="addShares"
            @sell-stock="removeShares"
          ></stocks-list>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        class="
          alert alert-success alert-dismissible
          fade
          show
          position-sticky
          bottom-0
        "
        role="alert"
        v-if="transactionComplete"
      >
        <i class="bi bi-check-circle me-2"></i>
        <strong>Success</strong> Your transaction is complete.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </transition>
  </div>
</template>

<script>
import StockLineGraph from "./components/StockLineGraph";
import StocksList from "./components/StocksList";
import StockSearch from "./components/StockSearch";
import StockCandlestick from "./components/StockCandlestick";
import StockNewsCarousel from "./components/StockNewsCarousel.vue";
const YEARLY_TRADING_DAYS = 253;
export default {
  name: "App",
  components: {
    StockLineGraph,
    StocksList,
    StockSearch,
    StockCandlestick,
    StockNewsCarousel,
  },
  data() {
    return {
      loading: true,
      apiKey: "1V4VMMH8KUPV4I15",
      upGraph: "bi bi-graph-up",
      downGraph: "bi bi-graph-down",
      stocks: [
        {
          symbol: "IBM",
          shares: 1,
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
      selectedStockIndex: 0,
      timeframe: "pastDay",
      graphType: "StockLineGraph",
      transactionComplete: false,
      donutChartOptions: {
        title: {
          text: "Holdings Summary",
          align: "Center",
        },
        labels: [],
        legend: false,
        tooltip: {
          y: {
            formatter: (value) => "$" + value.toFixed(2),
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
                  label: "Total Value",
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
    this.donutChartOptions.labels = this.allSymbols;
  },
  mounted() {
    setTimeout(() => (this.loading = false), 3000);
  },
  watch: {
    selectedStockIndex(selectedSymbol) {
      this.timeframe = "pastDay";
      let fetchPromises = [];
      if (this.selectedIntradayPrices.length === 0) {
        let shortenedSymbol = this.selectedSymbol.split(".")[0];
        fetchPromises.push(
          this.fetchIntradayPrices(shortenedSymbol).then(
            (priceData) =>
              (this.stocks[selectedSymbol].intradayPrices = priceData)
          )
        );
      }
      if (this.selectedDailyPrices.length === 0) {
        fetchPromises.push(
          this.fetchIntradayPrices(this.selectedSymbol).then(
            (priceData) => (this.stocks[selectedSymbol].dailyPrices = priceData)
          )
        );
      }
      Promise.all(fetchPromises).catch((error) => console.log(error));
    },
    transactionComplete(status) {
      if (status === true)
        setTimeout(() => (this.transactionComplete = false), 3000);
    },
    stocks: {
      deep: true,
      handler() {
        this.donutChartOptions = {
          ...this.donutChartOptions,
          ...{
            labels: this.allSymbols,
          },
        };
      },
    },
  },
  computed: {
    allSymbols() {
      return this.stocks.map((stock) => stock.symbol);
    },
    selectedSymbol() {
      return this.stocks[this.selectedStockIndex].symbol;
    },
    selectedIntradayPrices() {
      return this.stocks[this.selectedStockIndex].intradayPrices;
    },
    selectedDailyPrices() {
      return this.stocks[this.selectedStockIndex].dailyPrices;
    },
    pastYearPrices() {
      return this.selectedDailyPrices.slice(-YEARLY_TRADING_DAYS);
    },
    lineGraphIntradayPrices() {
      return this.selectedIntradayPrices.map((priceData) => {
        return {
          x: priceData.datetime,
          y: priceData.close,
        };
      });
    },
    lineGraphDailyPrices() {
      return this.selectedDailyPrices.map((priceData) => {
        return {
          x: priceData.date,
          y: priceData.close,
        };
      });
    },
    candlestickIntradayPrices() {
      return this.selectedIntradayPrices.map((priceData) => {
        return {
          x: priceData.datetime,
          y: [priceData.open, priceData.high, priceData.low, priceData.close],
        };
      });
    },
    candlestickDailyPrices() {
      return this.selectedDailyPrices.map((priceData) => {
        return {
          x: priceData.date,
          y: [priceData.open, priceData.high, priceData.low, priceData.close],
        };
      });
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
      if (this.selectedDailyPrices == 0) return 0;
      return parseInt(
        this.selectedDailyPrices.slice(-1)[0].volume
      ).toLocaleString();
    },
    // priceYTD() {
    //   if (
    //     this.pastYearPrices.length === 0 ||
    //     this.selectedIntradayPrices.length === 0
    //   )
    //     return null;

    //   let currentYear = new Date(
    //       this.pastYearPrices.slice(-1)[0].date
    //     ).getFullYear(),
    //     yearStartIndex = this.pastYearPrices.findIndex((priceData) => {
    //       let date = new Date(priceData.date);
    //       return date.getFullYear() === currentYear;
    //     }),
    //     yearStartPrice = this.pastYearPrices[yearStartIndex].open,
    //     currentPrice = this.selectedIntradayPrices.slice(-1)[0].close;

    //   return (currentPrice - yearStartPrice).toFixed(2);
    // },
    // percentYTD() {
    //   if (this.pastYearPrices.length === 0) return 0;

    //   let currentYear = new Date(
    //       this.pastYearPrices.slice(-1)[0].date
    //     ).getFullYear(),
    //     yearStartIndex = this.pastYearPrices.findIndex((priceData) => {
    //       let date = new Date(priceData.date);
    //       return date.getFullYear() === currentYear;
    //     }),
    //     yearStartPrice = this.pastYearPrices[yearStartIndex].open;

    //   if (yearStartPrice === 0) return 0;
    //   return ((this.priceYTD / yearStartPrice) * 100).toFixed(2);
    // },
    priceSinceInception() {
      if (this.selectedDailyPrices.length === 0) return 0;

      let startPrice = this.selectedDailyPrices[0].open,
        endPrice = this.selectedDailyPrices.slice(-1)[0].close;
      return (endPrice - startPrice).toFixed(2);
    },
    percentSinceInception() {
      if (this.selectedDailyPrices.length === 0) return 0;

      let startPrice = this.selectedDailyPrices[0].open;
      if (startPrice === 0) return 0;
      return ((this.priceSinceInception / startPrice) * 100).toFixed(2);
    },
    allStockShares() {
      let allStockShares = this.stocks.map((stock) => {
        if (stock.shares) return stock.shares;
        return 0;
      });
      return allStockShares;
    },
    startPricesPastDay() {
      let startPrices = this.stocks.map((stock) => {
        if (stock.intradayPrices.length === 0) return 0;

        let today = new Date(
            stock.intradayPrices.slice(-1)[0].datetime
          ).getDate(),
          todayStartIndex = stock.intradayPrices.findIndex((priceData) => {
            let date = new Date(priceData.datetime).getDate();
            return date === today;
          }),
          startPrice = stock.intradayPrices[todayStartIndex].close;
        return startPrice;
      });
      return startPrices;
    },
    endPricesPastDay() {
      let endPrices = this.stocks.map((stock) => {
        if (stock.intradayPrices.length === 0) return 0;

        let endPrice = stock.intradayPrices.slice(-1)[0].close;
        return endPrice;
      });
      return endPrices;
    },
    allStockHoldings() {
      let holdings = this.stocks.map((stock) => {
        if (stock.intradayPrices.length === 0) return 0;

        let currentPrice = stock.intradayPrices.slice(-1)[0].close;
        return stock.shares * currentPrice;
      });
      return holdings;
    },
  },
  methods: {
    async fetchIntradayPrices(symbol) {
      const json = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${
          symbol === "IBM" ? "demo" : this.apiKey
        }`
      )
        .then((response) => response.json())
        .catch((error) => {
          throw error;
        });
      let priceData = [];
      for (var datetime in json["Time Series (5min)"]) {
        priceData.push({
          datetime: new Date(datetime.replace(/-/g, "/")).getTime(),
          open: json["Time Series (5min)"][datetime]["1. open"],
          high: json["Time Series (5min)"][datetime]["2. high"],
          low: json["Time Series (5min)"][datetime]["3. low"],
          close: json["Time Series (5min)"][datetime]["4. close"],
          volume: json["Time Series (5min)"][datetime]["5. volume"],
        });
      }
      priceData = priceData.sort((a, b) => a.datetime - b.datetime);
      return priceData;
    },
    async fetchDailyPrices(symbol) {
      const json = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${
          symbol === "IBM" || symbol === "TSCO.LON" || symbol === "SHOP.TRT"
            ? "demo"
            : this.apiKey
        }`
      )
        .then((response) => response.json())
        .catch((error) => {
          throw error;
        });
      let priceData = [];
      for (var datetime in json["Time Series (Daily)"]) {
        priceData.push({
          date: new Date(datetime.replace(/-/g, "/")).getTime(),
          open: json["Time Series (Daily)"][datetime]["1. open"],
          high: json["Time Series (Daily)"][datetime]["2. high"],
          low: json["Time Series (Daily)"][datetime]["3. low"],
          close: json["Time Series (Daily)"][datetime]["4. close"],
          volume: json["Time Series (Daily)"][datetime]["5. volume"],
        });
      }
      priceData = priceData.sort((a, b) => a.date - b.date);
      return priceData;
    },
    getAnnualizedRate(years) {
      if (this.selectedDailyPrices.length === 0) return 0;

      var startPrice;
      let endPrice = this.selectedDailyPrices.slice(-1)[0].close;

      if (years === undefined) {
        let startYear = new Date(
            this.selectedDailyPrices[0].date
          ).getFullYear(),
          currentYear = new Date(
            this.selectedDailyPrices.slice(-1)[0].date
          ).getFullYear();

        years = currentYear - startYear;
        startPrice = this.selectedDailyPrices[0].open;
      } else
        startPrice = this.selectedDailyPrices.slice(
          -YEARLY_TRADING_DAYS * years
        )[0].open;

      let rate = endPrice / startPrice,
        annualizedRate = (Math.pow(rate, 1 / years) - 1) * 100;
      return annualizedRate.toFixed(2);
    },
    addShares(symbol, shares) {
      let existingStock = this.stocks.find((stock) => stock.symbol === symbol);
      if (existingStock) {
        this.stocks = this.stocks.map((stock) => {
          if (stock != existingStock) return stock;
          return {
            ...stock,
            ...{
              shares: stock.shares + parseFloat(shares),
            },
          };
        });
        this.transactionComplete = true;
        return;
      }

      var intradayPrices, dailyPrices;
      let shortenedSymbol = symbol.split(".")[0];

      let fetchPromises = [
        this.fetchIntradayPrices(shortenedSymbol).then(
          (priceData) => (intradayPrices = priceData)
        ),
        this.fetchDailyPrices(symbol).then(
          (priceData) => (dailyPrices = priceData)
        ),
      ];

      Promise.all(fetchPromises).then(() => {
        this.stocks.push({
          symbol: symbol,
          shares: parseFloat(shares),
          intradayPrices: intradayPrices,
          dailyPrices: dailyPrices,
        });
        this.transactionComplete = true;
      });
    },
    removeShares(symbol, shares) {
      let existingStock = this.stocks.find((stock) => stock.symbol === symbol);
      if (existingStock) {
        this.stocks = this.stocks.map((stock) => {
          if (stock != existingStock) return stock;
          return {
            ...stock,
            ...{
              shares: stock.shares - parseFloat(shares),
            },
          };
        });
        this.transactionComplete = true;
      }
    },
  },
};
</script>

<style>
.bi-graph-up,
.bi-arrow-up-circle {
  color: green;
}
.bi-graph-down,
.bi-arrow-down-circle {
  color: red;
}
</style>

<style scoped>
/* .bi-graph-up,
.bi-graph-down,
.bi-arrow-up-circle,
.bi-arrow-down-circle {
  font-size: 2rem;
} */

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
