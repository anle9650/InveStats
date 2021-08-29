<template>
  <vue-carousel :data="carouselData" :indicators="false"></vue-carousel>
</template>

<script>
import { defineAsyncComponent } from "vue";
const VueCarousel = defineAsyncComponent(() =>
  import(/* webpackChunkName: "vue-carousel" */ "@chenfengyuan/vue-carousel")
);
export default {
  components: {
    VueCarousel,
  },
  name: "stock-news-carousel",
  props: {
    selectedStock: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
    numberOfArticles: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      stocks: [],
    };
  },
  watch: {
    selectedStock: {
      handler(selectedStock) {
        if (
          this.stocks.includes((stock) => stock.symbol === selectedStock.symbol)
        )
          return;
        this.fetchArticles();
      },
      immediate: true,
    },
  },
  computed: {
    selectedStockArticles() {
      const selectedStock = this.stocks.find(
        (stock) => stock.symbol === this.selectedStock.symbol
      );
      return selectedStock?.articles ?? [];
    },
    carouselData() {
      if (this.selectedStockArticles.length === 0)
        return [
          /*html*/ `<div class="card"><div class="card-body"><p class="card-text">No news to display.</p></div></div>`,
        ];
      return this.selectedStockArticles.map((article) => {
        return /*html*/ ` 
          <div class="slide card">
              ${article.urlToImage? `<img class="card-img-top overflow-hidden" src="${article.urlToImage}" alt="Card image cap">` : ``}
              <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    ${this.selectedStock.symbol}
                  </h6>
                  <p class="card-text">
                    ${new DOMParser().parseFromString(article.description, "text/html").body.innerHTML}
                  </p>
                  <a href="${article.url}" class="card-link">
                    ${article.source}
                  </a>
              </div>
          </div>
        `;
      });
    },
  },
  methods: {
    async fetchArticles() {
      const response = await fetch(
        `api/news?q=${this.selectedStock.name}&from=${this.date.toISOString().split("T")[0]}`
      );
      const data = await response.json();

      const articles = data.articles
        .slice(0, this.numberOfArticles)
        .map((article) => {
          return {
            source: article.source.name,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
          };
        });

      this.stocks.push({
        ...this.selectedStock,
        articles,
      });
    },
  },
};
</script>

<style scope>
.slide {
  height: 40rem;
}
</style>
