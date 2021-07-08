<template>
  <div>
    <apexchart
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
    <div class="d-flex justify-content-between">
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        @click="showPastDay"
      >
        1D
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        @click="showPastWeek"
      >
        1W
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        @click="showPastMonth"
      >
        1M
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        @click="showPastYear"
      >
        1Y
      </button>
      <button type="button" class="btn btn-secondary btn-sm" @click="showAll">
        All
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "stock-line-graph",
  props: {
    symbol: {
      type: String,
      required: true,
    },
    // intradayPrices: {
    //   type: String,
    //   required: true
    // },
    // dailyPrices: {
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
      apiKey: "demo",
      options: {
        chart: {
          id: "stock-line-graph",
          zoom: {
            enabled: false,
          },
        },
        title: {
          text: undefined,
          style: {
            fontSize: "20px",
          },
        },
        subtitle: {
          text: undefined,
          style: {
            color: '#9699a2',
            fontSize: "18px",
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            show: false,
            datetimeUTC: false,
          },
        },
        colors: undefined,
        stroke: {
          width: 1,
        },
        tooltip: {
          x: {
            format: "MMM dd yyyy, h:mmTT",
          },
        },
      },
      series: [],
      priceChange: null,
      percentChange: null,
    };
  },
  created() {
    this.options.title.text = this.symbol;
    this.showPastDay();
  },
  watch: {
    symbol(newSymbol) {
      this.options.title.text = newSymbol;
      this.showPastDay();
    },
  },
  methods: {
    async fetchIntradayPrices() {
      const json = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.symbol}&interval=5min&apikey=${this.apiKey}`
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
    async fetchDailyPrices() {
      const json = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.symbol}&outputsize=full&apikey=${this.apiKey}`
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
    slicePriceData(priceData, startDate) {
      let startIndex = priceData.findIndex((dataPoint) => {
        let date = new Date(dataPoint.x);
        return (
          date.getFullYear() === startDate.getFullYear() &&
          date.getMonth() === startDate.getMonth() &&
          date.getDate() === startDate.getDate()
        );
      });
      return priceData.slice(startIndex);
    },
    updateSeries(priceData) {
      let series = {
        name: this.symbol,
        data: priceData,
      };
      this.series = [series];
    },
    updatePriceChange(priceData) {
      let startDatePrice = priceData[0].y,
        endDatePrice = priceData[priceData.length - 1].y;
      this.priceChange = (endDatePrice - startDatePrice).toFixed(4);
      this.percentChange = ((this.priceChange / startDatePrice) * 100).toFixed(
        2
      );
    },
    updateOptions(priceData, timeFrame) {
      const GREEN = "#00E396";
      const RED = "#EA3546";

      var lineColor, subtitleColor, subtitleText, dateFormat;

      // Set line and text color based on change in price.
      this.updatePriceChange(priceData);
      if (this.priceChange >= 0) {
        lineColor = GREEN;
        subtitleColor = GREEN;
        subtitleText = "+$";
      } else {
        lineColor = RED;
        subtitleColor = RED;
        subtitleText = "-$";
      }

      // Set the subtitle text to display change in price.
      subtitleText += `${Math.abs(this.priceChange)} (${Math.abs(
        this.percentChange
      )}%) ${timeFrame}`;

      // Set the tooltip to only show the full datetime when today's data is displayed.
      if (timeFrame === "Today") dateFormat = "MMM dd yyyy, h:mmTT";
      else dateFormat = "MMM dd yyyy";

     // Update options.
      this.options = {
        ...this.options,
        ...{
          colors: [lineColor],
          subtitle: {
            text: subtitleText,
            style: {
                color: subtitleColor,
            },
          },
          tooltip: {
            x: {
              format: dateFormat,
            },
          },
        },
      };
    },
    updateChart(priceData, startDate, timeFrame) {
      let newPriceData = this.slicePriceData(priceData, startDate);
      this.updateSeries(newPriceData);
      this.updateOptions(newPriceData, timeFrame);
    },
    showPastDay() {
      this.fetchIntradayPrices().then((priceData) => {
        let startDate = new Date(priceData[0].x);
        this.updateChart(priceData, startDate, "Today");
      });
    },
    showPastWeek() {
      this.fetchDailyPrices().then((priceData) => {
        let endDate = new Date(priceData[priceData.length - 1].x),
          lastWeek = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() - 7
          );
        this.updateChart(priceData, lastWeek, "Past Week");
      });
    },
    showPastMonth() {
      this.fetchDailyPrices().then((priceData) => {
        let endDate = new Date(priceData[priceData.length - 1].x),
          dateOffset = 24 * 60 * 60 * 1000 * 28,
          lastMonth = new Date(endDate.getTime() - dateOffset);
        this.updateChart(priceData, lastMonth, "Past Month");
      });
    },
    showPastYear() {
      this.fetchDailyPrices().then((priceData) => {
        let endDate = new Date(priceData[priceData.length - 1].x),
          dateOffset = 24 * 60 * 60 * 1000 * 52 * 7,
          lastYear = new Date(endDate.getTime() - dateOffset);
        this.updateChart(priceData, lastYear, "Past Year");
      });
    },
    showAll() {
      this.fetchDailyPrices().then((priceData) => {
        let startDate = new Date(priceData[0].x);
        this.updateChart(priceData, startDate, "All Time");
      });
    },
  },
};
</script>
