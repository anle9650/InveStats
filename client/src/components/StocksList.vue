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
            v-for="(stock, index) in stocks"
            :key="index"
            @click="$emit('selectStock', index)"
          >
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">{{ stock.symbol }}</h6>
              <small class="text-muted">
                <i
                  :class="[getPriceChange(stock) >= 0 ? upArrow : downArrow]"
                ></i>
                ${{ Math.abs(getPriceChange(stock)) }} ({{
                  Math.abs(getPercentChange(stock))
                }}%) Past Day
              </small>
            </div>
            <p class="mb-1">${{ getEndPrice(stock) }}</p>
            <div class="d-flex w-100 justify-content-between">
              <small class="text-muted">
                {{ stock.shares }}
                {{ stock.shares === 1 ? "share" : "shares" }}
              </small>
              <div>
                <button
                  class="btn btn-outline-primary btn-sm me-1"
                  data-bs-target="#buySharesInputModal"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  :disabled="getEndPrice(stock) === 0"
                  @click="stockToBuy = stock"
                >
                  Buy
                </button>
                <button
                  class="btn btn-outline-primary btn-sm"
                  data-bs-target="#sellSharesInputModal"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  :disabled="
                    stock.shares === 0 ||
                    getEndPrice(stock) === 0
                  "
                  @click="stockToSell = stock"
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
      :symbol="stockToBuy ? stockToBuy.symbol : null"
      @confirm-shares="
        (confirmedShares) => $emit('buyStock', stockToBuy ? stockToBuy.symbol : null, confirmedShares)
      "
    ></shares-input-modal>
    <shares-input-modal
      id="sellSharesInputModal"
      type="sell"
      :symbol="stockToSell ? stockToSell.symbol : null"
      :sharesOwned="stockToSell ? stockToSell.shares : 0"
      @confirm-shares="
        (confirmedShares) => $emit('sellStock', stockToSell ? stockToSell.symbol : null, confirmedShares)
      "
    ></shares-input-modal>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const SharesInputModal = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "shares-input-modal" */"./SharesInputModal.vue"
  )
);
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
  methods: {
    getStartPrice(stock) {
      if (typeof stock.intradayPrices === "undefined" || stock.intradayPrices.length === 0) return 0;
      let today = new Date(
          stock.intradayPrices.slice(-1)[0].datetime
        ).getDate(),
        todayStartIndex = stock.intradayPrices.findIndex((priceData) => {
          let date = new Date(priceData.datetime).getDate();
          return date === today;
        });
        return stock.intradayPrices[todayStartIndex].close;
    },
    getEndPrice(stock) {
      if (typeof stock.intradayPrices === "undefined" || stock.intradayPrices.length === 0) return 0;
      return stock.intradayPrices.slice(-1)[0].close;
    },
    getPriceChange(stock) {
      let startPrice = this.getStartPrice(stock),
        endPrice = this.getEndPrice(stock);
      return (endPrice - startPrice).toFixed(2);
    },
    getPercentChange(stock) {
      let priceChange = this.getPriceChange(stock),
        startPrice = this.getStartPrice(stock);
      if (startPrice === 0) return null;
      return ((priceChange / startPrice) * 100).toFixed(2);
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