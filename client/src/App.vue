<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-3">
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
      <div class="col-lg-3">
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
      <div class="col-lg-3">
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
      <div class="col-lg-3">
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
        <div
          class="shadow card mt-3 mb-4"
          v-if="
            selectedIntradayPrices.length != 0 &&
            selectedDailyPrices.length != 0
          "
        >
          <div class="card-body">
            <h5 class="card-title">Stats</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">An item</li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
              <li class="list-group-item">A fourth item</li>
              <li class="list-group-item">And a fifth one</li>
            </ul>
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
            :startPrices="startPricesYesterday"
            :endPrices="endPricesYesterday"
            @select-stock="(index) => (selectedStockIndex = index)"
            @buy-stock="addShares"
            @sell-stock="removeShares"
          ></stocks-list>
        </div>
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
const YEARLY_TRADING_DAYS = 253;
export default {
  name: "App",
  components: {
    StockLineGraph,
    StocksList,
    StockSearch,
  },
  data() {
    return {
      loading: true,
      apiKey: "1V4VMMH8KUPV4I15",
      upArrow: "bi bi-arrow-up-circle",
      downArrow: "bi bi-arrow-down-circle",
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
    this.donutChartOptions.labels = this.allSymbols;
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
    high52Week() {
      if (this.pastYearPrices.length === 0) return 0;

      let highPrice = Math.max.apply(
        Math,
        this.pastYearPrices.map((priceData) => priceData.y)
      );
      return highPrice;
    },
    low52Week() {
      if (this.pastYearPrices.length === 0) return 0;

      let lowPrice = Math.min.apply(
        Math,
        this.pastYearPrices.map((priceData) => priceData.y)
      );
      return lowPrice;
    },
    priceYTD() {
      if (
        this.pastYearPrices.length === 0 ||
        this.selectedIntradayPrices.length === 0
      )
        return null;

      let currentYear = new Date(
          this.pastYearPrices.slice(-1)[0].x
        ).getFullYear(),
        yearStartIndex = this.pastYearPrices.findIndex((priceData) => {
          let datetime = new Date(priceData.x);
          return datetime.getFullYear() === currentYear;
        }),
        yearStartPrice = this.pastYearPrices[yearStartIndex].y,
        currentPrice = this.selectedIntradayPrices.slice(-1)[0].y;

      return (currentPrice - yearStartPrice).toFixed(2);
    },
    percentYTD() {
      if (this.pastYearPrices.length === 0) return 0;

      let currentYear = new Date(
          this.pastYearPrices.slice(-1)[0].x
        ).getFullYear(),
        yearStartIndex = this.pastYearPrices.findIndex((priceData) => {
          let datetime = new Date(priceData.x);
          return datetime.getFullYear() === currentYear;
        }),
        yearStartPrice = this.pastYearPrices[yearStartIndex].y;

      if (yearStartPrice === 0) return 0;
      return ((this.priceYTD / yearStartPrice) * 100).toFixed(2);
    },
    priceSinceInception() {
      if (this.selectedDailyPrices.length === 0) return 0;

      let startPrice = this.selectedDailyPrices[0].y,
        endPrice = this.selectedDailyPrices.slice(-1)[0].y;
      return (endPrice - startPrice).toFixed(2);
    },
    percentSinceInception() {
      if (this.selectedDailyPrices.length === 0) return 0;

      let startPrice = this.selectedDailyPrices[0].y;
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
    startPricesYesterday() {
      let startPrices = this.stocks.map((stock) => {
        if (stock.intradayPrices.length === 0) return 0;

        let yesterday = new Date(stock.intradayPrices.slice(-1)[0].x).getDate(),
          yesterdayStartIndex = stock.intradayPrices.findIndex((priceData) => {
            let date = new Date(priceData.x).getDate();
            return date === yesterday;
          }),
          startPrice = stock.intradayPrices[yesterdayStartIndex].y;
        return startPrice;
      });
      return startPrices;
    },
    endPricesYesterday() {
      let endPrices = this.stocks.map((stock) => {
        if (stock.intradayPrices.length === 0) return 0;

        let endPrice = stock.intradayPrices.slice(-1)[0].y;
        return endPrice;
      });
      return endPrices;
    },
    allStockHoldings() {
      let holdings = this.stocks.map((stock) => {
        if (stock.intradayPrices.length === 0) return 0;

        let currentPrice = stock.intradayPrices.slice(-1)[0].y;
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
          x: new Date(datetime.replace(/-/g, "/")).getTime(),
          y: json["Time Series (Daily)"][datetime]["4. close"],
        });
      }
      priceData = priceData.sort((a, b) => a.x - b.x);
      return priceData;
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
.bi-graph-up,
.bi-graph-down,
.bi-arrow-up-circle,
.bi-arrow-down-circle {
  font-size: 2rem;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
