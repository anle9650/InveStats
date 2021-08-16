<template>
  <div>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Search stocks by symbol or name"
        aria-label="Search stocks"
        aria-describedby="search-button"
        list="datalistOptions"
        v-model="searchValue"
      />
      <datalist id="datalistOptions">
        <option
          v-for="(suggestion, index) in searchExamples"
          :key="index"
          :value="suggestion"
        ></option>
      </datalist>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#searchResultsModal"
        @click="fetchSearchResults"
      >
        <i class="bi bi-search" id="search-button"></i>
      </button>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="searchResultsModal"
      tabindex="-1"
      aria-labelledby="searchResultsModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="searchResultsModalLabel">
              Search Results
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <span v-if="searchResults.length === 0">No results found.</span>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="(stock, index) in searchResults"
                :key="index"
              >
                <div class="d-flex w-100 justify-content-between">
                  <h6>{{ stock.symbol }}</h6>
                  <div>
                    <button
                      class="btn btn-outline-primary btn-sm me-1"
                      data-bs-target="#searchResultsBuyModal"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                      @click="stockToBuy = stock"
                    >
                      Buy
                    </button>
                    <button
                      class="btn btn-outline-primary btn-sm"
                      data-bs-target="#searchResultsSellModal"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                      :disabled="getSharesOwned(stock) === 0"
                      @click="stockToSell = stock"
                    >
                      Sell
                    </button>
                  </div>
                </div>
                <small class="text-muted">{{ stock.name }}</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <shares-input-modal
      id="searchResultsBuyModal"
      type="buy"
      :symbol="stockToBuy ? stockToBuy.symbol : null"
      previousModal="#searchResultsModal"
      @confirm-shares="
        (confirmedShares) => $emit('buyStock', stockToBuy, confirmedShares)
      "
    ></shares-input-modal>
    <shares-input-modal
      id="searchResultsSellModal"
      type="sell"
      :symbol="stockToSell ? stockToSell.symbol : null"
      :sharesOwned="stockToSell ? stockToSell.shares : 0"
      previousModal="#searchResultsModal"
      @confirm-shares="
        (confirmedShares) => $emit('sellStock', stockToSell, confirmedShares)
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
  name: "stock-search",
  components: {
    SharesInputModal,
  },
  props: {
    stocksOwned: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["buyStock", "sellStock"],
  data() {
    return {
      apiKey: "1V4VMMH8KUPV4I15",
      searchExamples: ["tesco", "tencent", "BA", "SAIC"],
      searchValue: null,
      searchValueChange: false,
      searchResults: [],
      stockToBuy: null,
      stockToSell: null,
    };
  },
  watch: {
    searchValue() {
      this.searchValueChange = true;
    },
    searchResults() {
      this.searchValueChange = false;
    },
  },
  methods: {
    fetchSearchResults() {
      if (!this.searchValueChange) return;

      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
          this.searchValue
        }&apikey=${
          this.searchExamples.includes(this.searchValue) ? "demo" : this.apiKey
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.bestMatches) {
            this.searchResults = [];
            return;
          }
          this.searchResults = data.bestMatches.map((stock) => {
            return {
              symbol: stock["1. symbol"],
              name: stock["2. name"],
            };
          });
        })
        .catch((error) => console.log(error));
    },
    getSharesOwned(stock) {
      let ownedStock = this.stocksOwned.find((ownedStock) => ownedStock.symbol === stock.symbol);
      if (ownedStock) return ownedStock.shares;
      return 0;
    },
  },
};
</script>