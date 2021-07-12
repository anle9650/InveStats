<template>
  <div class="list-group list-group-flush">
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
          <i :class="[getPriceChange(index) >= 0 ? upArrow : downArrow]"></i>
          ${{ Math.abs(getPriceChange(index)) }} 
          ({{ Math.abs(getPercentChange(index)) }}%)
          Yesterday
        </small>
      </div>
      <p class="mb-1">${{ endPrices[index] }}</p>
      <div class="d-flex w-100 justify-content-between">
        <small class="text-muted">
          {{ stockShares[index] }}
          {{ stockShares[index] === 1 ? "share" : "shares" }}
        </small>
        <button
          class="btn btn-outline-primary btn-sm"
          data-bs-target="#buySharesModal"
          data-bs-toggle="modal"
          data-bs-dismiss="modal"
          @click="selectedSymbol = stock.symbol; shares = null;"
        >
          Buy
        </button>
      </div>
    </a>
  </div>
</template>

<script>
export default {
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
  emits: ["selectStock"],
  data() {
    return {
      upArrow: "bi bi-arrow-up-circle",
      downArrow: "bi bi-arrow-down-circle",
    };
  },
  methods: {
    getPriceChange(stockIndex) {
      return (this.endPrices[stockIndex] - this.startPrices[stockIndex]).toFixed(2);
    },
    getPercentChange(stockIndex) {
      let priceChange = this.getPriceChange(stockIndex),
        startPrice = this.startPrices[stockIndex];
      if (startPrice === 0) return 0;
      return ((priceChange / startPrice) * 100).toFixed(2);
    },
  },
};
</script>