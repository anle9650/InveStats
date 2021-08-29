<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i class="bi bi-pie-chart-fill text-secondary me-2"></i>
        Shares
      </span>
      <span>{{ stockShares }}</span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i class="bi bi-percent text-secondary me-2"></i>
        Portfolio Diversity
      </span>
      <span>{{ stockDiversity }}%</span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i class="bi bi-cash text-success me-2"></i>
        Market Value
      </span>
      <span>${{ stockValue }}</span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i
          :class="[
            stockAverageCost >= stockPrice ? upArrow : downArrow,
            'me-2',
          ]"
        ></i>
        Average Cost
      </span>
      <span>
        {{ stockAverageCost >= 0 ? "" : "-" }}${{ Math.abs(stockAverageCost) }}
      </span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i :class="[stockDayReturns >= 0 ? upGraph : downGraph, 'me-2']"></i>
        Past Day Returns
      </span>
      <span>
        {{ stockDayReturns >= 0 ? "" : "-" }}${{ Math.abs(stockDayReturns) }}
      </span>
    </li>
    <li class="list-group-item d-flex w-100 justify-content-between">
      <span>
        <i :class="[stockTotalReturns >= 0 ? upGraph : downGraph, 'me-2']"></i>
        Total Returns
      </span>
      <span>
        {{ stockTotalReturns >= 0 ? "" : "-" }}${{
          Math.abs(stockTotalReturns)
        }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "stock-performance-display",
  props: {
    stocks: {
      type: Array,
      required: true,
    },
    selectedStockIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      upArrow: "bi bi-arrow-up-circle",
      downArrow: "bi bi-arrow-down-circle",
      upGraph: "bi bi-graph-up",
      downGraph: "bi bi-graph-down",
    };
  },
  computed: {
    selectedStock() {
      return this.stocks[this.selectedStockIndex];
    },
    stockPrice() {
      return this.selectedStock?.intradayPrices?.slice(-1)[0]?.close ?? 0;
    },
    stockShares() {
      return this.selectedStock?.shares ?? 0;
    },
    stockTotalCost() {
      return (
        this.selectedStock?.transactions?.reduce(
          (totalCost, transaction) =>
            totalCost + transaction.price * transaction.shares,
          0
        ) ?? 0
      );
    },
    stockAverageCost() {
      if (this.stockShares === 0) return this.stockTotalCost;
      return (this.stockTotalCost / this.stockShares).toFixed(2);
    },
    stockValue() {
      return (this.stockPrice * this.stockShares).toFixed(2);
    },
    stockDiversity() {
      let totalValue = this.allStockHoldings.reduce(
        (totalValue, value) => totalValue + value,
        0
      );
      if (totalValue === 0) return 0;
      return ((this.stockValue / totalValue) * 100).toFixed(2);
    },
    stockDayReturns() {
      if (
        !this.selectedStock?.intradayPrices ||
        this.selectedStock.intradayPrices.length === 0
      )
        return 0;

      const endDay = new Date(
        this.selectedStock.intradayPrices.slice(-1)[0].datetime
      );

      const startDayPrices = this.selectedStock.intradayPrices.find(
        (priceData) => {
          const datetime = new Date(priceData.datetime);
          return datetime.getDate() === endDay.getDate();
        }
      );

      const startDayPrice = startDayPrices.close;

      const startDayShares =
        this.selectedStock.transactions?.reduce((totalShares, transaction) => {
          const transactionDatetime = new Date(transaction.datetime);
          if (transactionDatetime <= endDay)
            return totalShares + transaction.shares;
          return totalShares;
        }, 0) ?? 0;

      return ((this.stockPrice - startDayPrice) * startDayShares).toFixed(2);
    },
    stockTotalReturns() {
      return (this.stockValue - this.stockTotalCost).toFixed(2);
    },
    allStockHoldings() {
      let holdings = this.stocks.map((stock) => {
        let currentPrice = stock.intradayPrices?.slice(-1)[0]?.close ?? 0;
        return stock.shares * currentPrice;
      });
      return holdings;
    },
  },
};
</script>

<style scoped>
.bi-arrow-up-circle {
  color: red;
}
.bi-arrow-down-circle {
  color: green;
}
</style>