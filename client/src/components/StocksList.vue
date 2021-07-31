<template>
  <div style="display: contents">
    <div class="shadow card sticky-menu">
      <div class="card-body">
        <h5 class="card-title">Stocks</h5>
      </div>
      <div class="list-group list-group-flush">
        <transition-group name="list">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="(symbol, index) in allSymbols"
            :key="index"
            @click="$emit('selectStock', index)"
          >
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">{{ symbol }}</h6>
              <small class="text-muted">
                <i
                  :class="[getPriceChange(index) >= 0 ? upArrow : downArrow]"
                ></i>
                ${{ Math.abs(getPriceChange(index)) }} ({{
                  Math.abs(getPercentChange(index))
                }}%) Past Day
              </small>
            </div>
            <p class="mb-1">${{ endPricesPastDay[index] }}</p>
            <div class="d-flex w-100 justify-content-between">
              <small class="text-muted">
                {{ allStockShares[index] }}
                {{ allStockShares[index] === 1 ? "share" : "shares" }}
              </small>
              <div>
                <button
                  class="btn btn-outline-primary btn-sm me-1"
                  data-bs-target="#buySharesInputModal"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  :disabled="endPricesPastDay[index] === 0"
                  @click="stockToBuy = symbol"
                >
                  Buy
                </button>
                <button
                  class="btn btn-outline-primary btn-sm"
                  data-bs-target="#sellSharesInputModal"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  :disabled="getSharesOwned(symbol) === 0 || endPricesPastDay[index] === 0"
                  @click="stockToSell = symbol"
                >
                  Sell
                </button>
              </div>
            </div>
          </a>
        </transition-group>
      </div>
    </div>
    <shares-input-modal
      id="buySharesInputModal"
      type="buy"
      :symbol="stockToBuy"
      @confirm-shares="
        (confirmedShares) => $emit('buyStock', stockToBuy, confirmedShares)
      "
    ></shares-input-modal>
    <shares-input-modal
      id="sellSharesInputModal"
      type="sell"
      :symbol="stockToSell"
      :sharesOwned="getSharesOwned(stockToSell)"
      @confirm-shares="
        (confirmedShares) => $emit('sellStock', stockToSell, confirmedShares)
      "
    ></shares-input-modal>
  </div>
</template>

<script>
import SharesInputModal from "./SharesInputModal.vue";
export default {
  components: { SharesInputModal },
  name: "stocks-list",
  props: {
    stocks: Array,
  },
  emits: ["selectStock", "buyStock", "sellStock"],
  data() {
    return {
      upArrow: "bi bi-arrow-up-circle",
      downArrow: "bi bi-arrow-down-circle",
      stockToBuy: null,
      stockToSell: null,
    };
  },
  computed: {
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
    startPricesPastDay() {
      let startPrices = this.stocks.map((stock) => {
        if (
          typeof stock.intradayPrices === "undefined" ||
          stock.intradayPrices.length === 0
        )
          return 0;

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
        if (
          typeof stock.intradayPrices === "undefined" ||
          stock.intradayPrices.length === 0
        )
          return 0;

        let endPrice = stock.intradayPrices.slice(-1)[0].close;
        return endPrice;
      });
      return endPrices;
    },
  },
  methods: {
    getPriceChange(stockIndex) {
      return (
        this.endPricesPastDay[stockIndex] - this.startPricesPastDay[stockIndex]
      ).toFixed(2);
    },
    getPercentChange(stockIndex) {
      let priceChange = this.getPriceChange(stockIndex),
        startPrice = this.startPricesPastDay[stockIndex];
      if (startPrice === 0) return null;
      return ((priceChange / startPrice) * 100).toFixed(2);
    },
    getSharesOwned(stock) {
      let stockIndex = this.allSymbols.findIndex((symbol) => symbol === stock);
      return this.allStockShares[stockIndex];
    },
  },
};
</script>

<style scoped>
.sticky-menu {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow: scroll;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>