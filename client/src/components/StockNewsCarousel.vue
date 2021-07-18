<template>
  <vue-carousel :data="carouselData" :indicators="false"></vue-carousel>
</template>

<script>
export default {
  name: "stock-news-carousel",
  props: {
    stockSymbol: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      apiHost: "https://newsapi.org",
      apiPath: "/v2/everything",
      apiKey: "290461764c484a18b2e4a24fcba4a867",
      today: null,
      domains:
        "investor.gov, investing.com, investopedia.com, fool.com, wsj.com, ft.com, seekingalpha.com, benzinga.com, zacks.com, morningstar.com, marketwatch.com, finance.yahoo.com",
      stocks: [],
    };
  },
  created() {
    this.today = new Date().toISOString().split("T")[0];
    if (this.stocks.includes((stock) => stock.symbol === this.stockSymbol))
      return;
    this.fetchArticles();
  },
  watch: {
    stockSymbol(newSymbol) {
      if (this.stocks.includes((stock) => stock.symbol === newSymbol)) return;
      this.fetchArticles();
    },
  },
  computed: {
    selectedStockArticles() {
      let selectedStock = this.stocks.find(
        (stock) => stock.symbol === this.stockSymbol
      );
      if (!selectedStock) return [];
      return selectedStock.articles;
    },
    carouselData() {
      //   if (this.selectedStockArticles.length === 0)
      //     return [
      //       /*html*/ `<div class="slide card"><div class="card-body"><p class="card-text">No news to display.</p></div></div>`,
      //     ];
      return this.selectedStockArticles.map((article) => {
        return /*html*/ ` 
            <div class="slide card">
                <img class="card-img-top overflow-hidden" src="${article.urlToImage}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${this.stockSymbol}</h6>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" class="card-link">${article.source}</a>
                </div>
            </div>
        `;
      });
    },
  },
  methods: {
    fetchArticles() {
      fetch(
        `${this.apiHost}${this.apiPath}?apiKey=${this.apiKey}&q=${this.stockSymbol}&from=${this.today}&language=en&sortBy=relevancy`
      )
        .then((response) => response.json())
        .then((json) => {
          let articles = json.articles.slice(0, 5).map((article) => {
            return {
              source: article.source.name,
              title: article.title,
              description: article.description,
              url: article.url,
              urlToImage: article.urlToImage,
            };
          });
          this.stocks.push({
            symbol: this.stockSymbol,
            articles: articles,
          });
        });
    },
  },
};
</script>

<style scope>
.slide {
  min-height: 40rem;
  max-height: 40rem;
}
</style>
