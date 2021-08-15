<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-8">
        <!-- Loading screen, error message, or stock line/candlestick graphs -->
        <transition name="slide-fade" mode="out-in">
          <!-- If loading, show loading screen. -->
          <div
            class="d-flex justify-content-center"
            v-if="loading && selectedIntradayPrices.length === 0"
          >
            <div class="spinner-border me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span>Loading...</span>
          </div>
          <!-- Else if no longer loading, and selected stock has missing price data, show error message. -->
          <div
            v-else-if="
              !loading &&
              (selectedIntradayPrices.length === 0 ||
                selectedDailyPrices.length === 0)
            "
            class="alert alert-danger"
            role="alert"
          >
            Maximum API calls exceeded. Please try again in
            {{ apiLockTime }} seconds, or use demo stock (IBM).
          </div>
          <!-- Else show line/candlestick graphs for selected stock. -->
          <div v-else class="shadow card mb-3">
            <div class="card-body">
              <stock-line-candle
                :name="selectedSymbol"
                :intradayPrices="selectedIntradayPrices"
                :dailyPrices="selectedDailyPrices"
              ></stock-line-candle>
            </div>
          </div>
        </transition>
        <div class="row">
          <div class="col-lg-6">
            <!-- Stock stats or personal performance. -->
            <div class="shadow card mb-3">
              <div class="card-body">
                <h5 class="card-title d-flex justify-content-between">
                  {{ showStats ? "Stats" : "Personal Performance" }}
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="showStats = !showStats"
                  >
                    {{ showStats ? "Personal Performance" : "Stats" }}
                  </button>
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  {{ selectedSymbol }}
                </h6>
                <transition name="slide-fade" mode="out-in">
                  <!-- If showStats, show stats. -->
                  <stock-stats-display
                    v-if="showStats"
                    :dailyPrices="selectedDailyPrices"
                  ></stock-stats-display>
                  <!-- Else show personal performance. -->
                  <stock-performance-display
                    v-else
                    :stocks="stocks"
                    :selectedStockIndex="selectedStockIndex"
                  ></stock-performance-display>
                </transition>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="shadow card mb-3">
              <!-- Donut chart displaying percentage of each stock held. -->
              <div class="card-body">
                <!-- on click of donut slice, set selectedStockIndex to correspond to clicked slice. -->
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
        <!-- Display most recent news for selected stock. -->
        <stock-news-carousel
          class="shadow mb-3"
          v-if="mostRecentDate"
          :stockSymbol="selectedSymbol.split('.')[0]"
          :date="mostRecentDate"
        ></stock-news-carousel>
      </div>
      <!-- Stock searchbar and stock list. -->
      <div class="col-lg-4">
        <div class="mb-3">
          <stock-search
            :stocksOwned="stocks"
            @buy-stock="addShares"
            @sell-stock="removeShares"
          ></stock-search>
        </div>
        <stocks-list
          :stocks="stocks"
          @select-stock="(index) => (selectedStockIndex = index)"
          @buy-stock="addShares"
          @sell-stock="removeShares"
        ></stocks-list>
      </div>
    </div>
    <!-- Notification displayed upon successful stock purchase or sale. -->
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
import StockLineCandle from "./components/StockLineCandle.vue";
import StockSearch from "./components/StockSearch.vue";
import StocksList from "./components/StocksList";
import StockPerformanceDisplay from "./components/StockPerformanceDisplay.vue";
import StockStatsDisplay from "./components/StockStatsDisplay.vue";
import { defineAsyncComponent } from "vue";

const StockNewsCarousel = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "stock-news-carousel" */ "./components/StockNewsCarousel.vue"
  )
);
export default {
  name: "App",
  components: {
    StocksList,
    StockSearch,
    StockNewsCarousel,
    StockPerformanceDisplay,
    StockStatsDisplay,
    StockLineCandle,
  },
  data() {
    return {
      portfolioId: "60fb9d7a50c8612b1fc884a0",
      apiKey: "1V4VMMH8KUPV4I15",
      loading: true,
      apiLocked: false,
      apiLockTime: 0,
      stocks: [],
      selectedStockIndex: 0,
      showStats: false,
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
    this.fetchStocks().then(() => {
      this.stocks.forEach((stock) => {
        this.fetchStockData(stock);
      });
    });
  },
  mounted() {
    setTimeout(() => (this.loading = false), 5000);
  },
  watch: {
    selectedStockIndex() {
      if (
        this.selectedIntradayPrices.length != 0 &&
        this.selectedDailyPrices.length != 0
      )
        return;

      this.fetchStockData(this.selectedStock)
        .then(() => {
          if (
            this.selectedIntradayPrices.length === 0 ||
            this.selectedDailyPrices.length === 0
          )
            this.apiLocked = true;
          else this.apiLocked = false;
        })
        .catch((error) => console.log(error));
    },
    apiLocked(status) {
      if (status === false) {
        this.fetchStockData(this.selectedStock);
        return;
      }

      this.apiLockTime = 60;
      var timer = setInterval(() => {
        this.apiLockTime--;
        if (this.apiLockTime === 0) {
          clearInterval(timer);
          this.apiLocked = false;
        }
      }, 1000);
    },
    transactionComplete(status) {
      if (status === true)
        setTimeout(() => (this.transactionComplete = false), 3000);
    },
    stocks: {
      deep: true,
      immediate: true,
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
    selectedStock() {
      return this.stocks[this.selectedStockIndex];
    },
    selectedSymbol() {
      return this.selectedStock?.symbol ?? "";
    },
    selectedIntradayPrices() {
      return this.selectedStock?.intradayPrices ?? [];
    },
    selectedDailyPrices() {
      return this.selectedStock?.dailyPrices ?? [];
    },
    mostRecentDate() {
      if (this.selectedIntradayPrices.length === 0) return null;
      return new Date(this.selectedIntradayPrices.slice(-1)[0].datetime);
    },
    allSymbols() {
      return this.stocks.map((stock) => stock.symbol);
    },
    allStockHoldings() {
      let holdings = this.stocks.map((stock) => {
        let currentPrice = stock.intradayPrices?.slice(-1)[0]?.close ?? 0;
        return stock.shares * currentPrice;
      });
      return holdings;
    },
  },
  methods: {
    async fetchStocks() {
      const json = await fetch(`api/portfolios/${this.portfolioId}`)
          .then((response) => response.json())
          .catch((error) => {
            throw error;
          });
      this.stocks = json.data.portfolio.stocks;
    },
    async fetchIntradayPrices(stock) {
      let shortenedSymbol = stock.symbol.split(".")[0];
      const json = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${shortenedSymbol}&interval=5min&apikey=${
          shortenedSymbol === "IBM" ? "demo" : this.apiKey
        }`
      )
        .then((response) => response.json())
        .catch((error) => {
          throw error;
        });

      let intradayPrices = [];
      for (var datetime in json["Time Series (5min)"]) {
        intradayPrices.push({
          datetime: new Date(datetime.replace(/-/g, "/")).getTime(),
          open: json["Time Series (5min)"][datetime]["1. open"],
          high: json["Time Series (5min)"][datetime]["2. high"],
          low: json["Time Series (5min)"][datetime]["3. low"],
          close: json["Time Series (5min)"][datetime]["4. close"],
          volume: json["Time Series (5min)"][datetime]["5. volume"],
        });
      }
      intradayPrices = intradayPrices.sort((a, b) => a.datetime - b.datetime);
      stock.intradayPrices = intradayPrices;
    },
    async fetchDailyPrices(stock) {
      const json = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
          stock.symbol
        }&outputsize=full&apikey=${
          stock.symbol === "IBM" ||
          stock.symbol === "TSCO.LON" ||
          stock.symbol === "SHOP.TRT"
            ? "demo"
            : this.apiKey
        }`
      )
        .then((response) => response.json())
        .catch((error) => {
          throw error;
        });

      let dailyPrices = [];
      for (var datetime in json["Time Series (Daily)"]) {
        dailyPrices.push({
          date: new Date(datetime.replace(/-/g, "/")).getTime(),
          open: json["Time Series (Daily)"][datetime]["1. open"],
          high: json["Time Series (Daily)"][datetime]["2. high"],
          low: json["Time Series (Daily)"][datetime]["3. low"],
          close: json["Time Series (Daily)"][datetime]["4. close"],
          volume: json["Time Series (Daily)"][datetime]["5. volume"],
        });
      }
      dailyPrices = dailyPrices.sort((a, b) => a.date - b.date);
      stock.dailyPrices = dailyPrices;
    },
    fetchStockData(stock) {
      let fetchPromises = [];
      if (!stock.intradayPrices || stock.intradayPrices.length === 0)
        fetchPromises.push(this.fetchIntradayPrices(stock));
      if (!stock.dailyPrices || stock.dailyPrices.length === 0)
        fetchPromises.push(this.fetchDailyPrices(stock));
      return Promise.all(fetchPromises);
    },
    addShares(symbol, sharesToAdd) {
      // If the stock already exists in this.stocks, update the number of shares held, and record the transaction.
      let existingStock = this.stocks.find((stock) => stock.symbol === symbol);
      if (existingStock) {
        existingStock.shares += sharesToAdd;
        existingStock.transactions.push({
          datetime: new Date(),
          price: existingStock.intradayPrices.slice(-1)[0].close,
          shares: sharesToAdd,
        });

        this.transactionComplete = true;
        return;
      }

      // If the stock does not already exist in this.stocks, fetch the price data for the stock, then set the number of shares and record the transaction.
      let newStock = { symbol, shares: sharesToAdd };
      this.fetchStockData(newStock).then(() => {
        newStock.transactions = [
          {
            datetime: new Date(),
            price: newStock.intradayPrices.slice(-1)[0]?.close ?? 0,
            shares: sharesToAdd,
          },
        ];
        this.stocks.push(newStock);
        this.transactionComplete = true;
      });
    },
    removeShares(symbol, sharesToRemove) {
      let existingStock = this.stocks.find((stock) => stock.symbol === symbol);
      if (existingStock === undefined) return;

      existingStock.shares -= sharesToRemove;
      existingStock.transactions.push({
        datetime: new Date(),
        price: existingStock.intradayPrices.slice(-1)[0].close,
        shares: -sharesToRemove,
      });
      this.transactionComplete = true;
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
