<template>
  <div>
    <div class="list-group list-group-flush">
      <transition-group name="list">
        <a
          href="#"
          class="list-group-item list-group-item-action"
          v-for="(symbol, index) in symbols"
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
          <p class="mb-1">${{ endPrices[index] }}</p>
          <div class="d-flex w-100 justify-content-between">
            <small class="text-muted">
              {{ stockShares[index] }}
              {{ stockShares[index] === 1 ? "share" : "shares" }}
            </small>
            <div>
              <button
                class="btn btn-outline-primary btn-sm me-1"
                data-bs-target="#buySharesInputModal"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                @click="stockToBuy = symbol"
              >
                Buy
              </button>
              <button
                class="btn btn-outline-primary btn-sm"
                data-bs-target="#sellSharesInputModal"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                :disabled="getSharesOwned(symbol) === 0"
                @click="stockToSell = symbol"
              >
                Sell
              </button>
            </div>
          </div>
        </a>
      </transition-group>
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
    symbols: {
      type: Array,
      required: true,
    },
    stockShares: {
      type: Array,
      required: true,
    },
    startPrices: {
      type: Array,
      required: true,
    },
    endPrices: {
      type: Array,
      required: true,
    },
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
    getPriceChange(stockIndex) {
      return (
        this.endPrices[stockIndex] - this.startPrices[stockIndex]
      ).toFixed(2);
    },
    getPercentChange(stockIndex) {
      let priceChange = this.getPriceChange(stockIndex),
        startPrice = this.startPrices[stockIndex];
      if (startPrice === 0) return null;
      return ((priceChange / startPrice) * 100).toFixed(2);
    },
    getSharesOwned(stock) {
      let stockIndex = this.symbols.findIndex((symbol) => symbol === stock);
      return this.stockShares[stockIndex];
    },
  },
};
</script>

<style scoped>
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