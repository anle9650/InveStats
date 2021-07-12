<template>
  <div>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Search and buy stocks"
        aria-label="Search and buy stocks"
        aria-describedby="search-button"
        list="datalistOptions"
        v-model="searchValue"
      />
      <datalist id="datalistOptions">
        <option v-for="(suggestion, index) in searchExamples" :key="index" :value="suggestion"></option>
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
                <small class="text-muted">{{ stock.name }}</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="buySharesModal"
      aria-hidden="true"
      aria-labelledby="buySharesModalLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="buySharesModalLabel">
              Buy how many shares?
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="form-floating">
              <input
                type="number"
                :class="['form-control', validationClass]"
                id="sharesInput"
                v-model="shares"
              />
              <div id="sharesInputFeedback" class="invalid-feedback">
                Please provide a valid number.
              </div>
              <label for="sharesInput">Shares of {{ selectedSymbol }}</label>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-success"
              data-bs-dismiss="modal"
              :disabled="!validSharesInput"
              @click="
                $emit('buyStock', selectedSymbol, shares);
              "
            >
              <i class="bi bi-check2"></i> Confirm
            </button>
            <button
              class="btn btn-outline-danger"
              data-bs-target="#searchResultsModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-x"></i> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stock-search-buy",
  emits: ["buyStock"],
  data() {
    return {
      apiKey: '1V4VMMH8KUPV4I15',
      searchExamples: ["tesco", "tencent", "BA", "SAIC"],
      searchValue: null,
      searchValueChange: false,
      searchResults: [],
      selectedSymbol: null,
      shares: undefined,
      validationClass: null,
    };
  },
  watch: {
    searchValue() {
      this.searchValueChange = true;
    },
    searchResults() {
      this.searchValueChange = false;
    },
    shares() {
      if (this.validSharesInput) this.validationClass = "is-valid";
      else if (this.validSharesInput === undefined) this.validationClass = null;
      else this.validationClass = "is-invalid";
    },
  },
  computed: {
    validSharesInput() {
      if (this.shares > 0) return true;
      else if (this.shares == null) return undefined;
      return false;
    },
  },
  methods: {
    fetchSearchResults() {
      if (!this.searchValueChange) return;

      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.searchValue}&apikey=${
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
  },
};
</script>