<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-8">
        <transition name="slide-fade" mode="out-in">
          <div
            class="d-flex justify-content-center"
            v-if="
              loading &&
              (selectedIntradayPrices.length === 0 ||
                selectedDailyPrices.length === 0)
            "
          >
            <div class="spinner-border me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span>Loading...</span>
          </div>
          <div
            v-else-if="
              selectedIntradayPrices.length != 0 &&
              selectedDailyPrices.length != 0
            "
            class="shadow card mb-3"
          >
            <div class="card-body">
              <stock-line-candle
                :name="selectedSymbol"
                :intradayPrices="selectedIntradayPrices"
                :dailyPrices="selectedDailyPrices"
              ></stock-line-candle>
            </div>
          </div>
          <div v-else-if="!loading" class="alert alert-danger" role="alert">
            Maximum API calls exceeded. Please try again in 60 seconds, or use
            demo stock (IBM).
          </div>
        </transition>
        <div class="row">
          <div class="col-lg-6">
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
                <stock-stats-display
                  v-if="showStats"
                  :stocks="
                    stocks.map((stock) => {
                      return {
                        dailyPrices: stock.dailyPrices,
                      };
                    })
                  "
                  :selectedStockIndex="selectedStockIndex"
                ></stock-stats-display>
                <stock-performance-display
                  v-else
                  :stocks="
                    stocks.map((stock) => {
                      return {
                        shares: stock.shares,
                        transactions: stock.transactions,
                        intradayPrices: stock.intradayPrices,
                      };
                    })
                  "
                  :selectedStockIndex="selectedStockIndex"
                ></stock-performance-display>
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
        <stock-news-carousel
          class="shadow mb-3"
          v-if="mostRecentDate"
          :stockSymbol="selectedSymbol.split('.')[0]"
          :date="mostRecentDate"
        ></stock-news-carousel>
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
        <stocks-list
          :stocks="
            stocks.map((stock) => {
              return {
                symbol: stock.symbol,
                shares: stock.shares,
                intradayPrices: stock.intradayPrices,
              };
            })
          "
          @select-stock="(index) => (selectedStockIndex = index)"
          @buy-stock="addShares"
          @sell-stock="removeShares"
        ></stocks-list>
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
import StocksList from "./components/StocksList";
import StockSearch from "./components/StockSearch";
import StockNewsCarousel from "./components/StockNewsCarousel.vue";
import StockPerformanceDisplay from "./components/StockPerformanceDisplay.vue";
import StockStatsDisplay from "./components/StockStatsDisplay.vue";
import StockLineCandle from "./components/StockLineCandle.vue";
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
    this.fetchStocks().then((stocks) => {
      this.stocks = stocks;

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
    });
  },
  mounted() {
    setTimeout(() => (this.loading = false), 3000);
  },
  watch: {
    selectedStockIndex(selectedSymbol) {
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
      if (this.stocks.length === 0) return "";
      return this.selectedStock.symbol;
    },
    selectedIntradayPrices() {
      if (
        this.stocks.length === 0 ||
        typeof this.selectedStock.intradayPrices === "undefined"
      )
        return [];
      return this.selectedStock.intradayPrices;
    },
    selectedDailyPrices() {
      if (
        this.stocks.length === 0 ||
        typeof this.selectedStock.dailyPrices === "undefined"
      )
        return [];
      return this.selectedStock.dailyPrices;
    },
    mostRecentDate() {
      if (this.selectedIntradayPrices.length === 0) return null;
      return new Date(this.selectedIntradayPrices.slice(-1)[0].datetime);
    },
    allSymbols() {
      return this.stocks.map((stock) => stock.symbol);
    },
    allStockShares() {
      let allStockShares = this.stocks.map((stock) => {
        if (stock.shares) return stock.shares;
        return 0;
      });
      return allStockShares;
    },
    allStockHoldings() {
      let holdings = this.stocks.map((stock) => {
        if (
          typeof stock.intradayPrices === "undefined" ||
          stock.intradayPrices.length === 0
        )
          return 0;

        let currentPrice = stock.intradayPrices.slice(-1)[0].close;
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
          }),
        stocks = json.data.portfolio.stocks;
      return stocks.map((stock) => {
        return {
          symbol: stock.symbol,
          shares: stock.shares,
          transactions: stock.transactions,
        };
      });
    },
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
    addShares(symbol, shares) {
      // If the stock already exists in this.stocks, update the number of shares held, and record the transaction.
      let existingStock = this.stocks.find((stock) => stock.symbol === symbol);
      if (existingStock) {
        this.stocks = this.stocks.map((stock) => {
          if (stock != existingStock) return stock;
          return {
            ...stock,
            ...{
              shares: stock.shares + parseFloat(shares),
              transactions: [
                ...stock.transactions,
                {
                  datetime: new Date(),
                  price: stock.intradayPrices.slice(-1)[0].close,
                  shares: parseFloat(shares),
                },
              ],
            },
          };
        });
        this.transactionComplete = true;
        return;
      }
      // If the stock does not already exist in this.stocks, fetch the price data for the stock, then set the number of shares and record the transaction.
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
          transactions: [
            {
              datetime: new Date(),
              price:
                intradayPrices.length > 0
                  ? intradayPrices.slice(-1)[0].close
                  : 0,
              shares: parseFloat(shares),
            },
          ],
          intradayPrices: intradayPrices,
          dailyPrices: dailyPrices,
        });
        this.transactionComplete = true;
      });
    },
    removeShares(symbol, shares) {
      let existingStock = this.stocks.find((stock) => stock.symbol === symbol);
      if (existingStock === undefined) return;

      this.stocks = this.stocks.map((stock) => {
        if (stock != existingStock) return stock;
        return {
          ...stock,
          ...{
            shares: stock.shares - parseFloat(shares),
            transactions: [
              ...stock.transactions,
              {
                datetime: new Date(),
                price: stock.intradayPrices.slice(-1)[0].close,
                shares: -parseFloat(shares),
              },
            ],
          },
        };
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
