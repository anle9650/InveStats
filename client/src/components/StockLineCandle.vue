<template>
  <div style="display: contents">
    <div class="d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-outline-primary btn-sm"
        v-show="graphType == 'line'"
        @click="graphType = 'candlestick'"
      >
        <i class="bi bi-align-center"></i>
      </button>
      <button
        type="button"
        class="btn btn-outline-primary btn-sm"
        v-show="graphType == 'candlestick'"
        @click="graphType = 'line'"
      >
        <i class="bi bi-graph-up" style="color: unset; font-size: unset"></i>
      </button>
    </div>
    <apexchart
      v-if="graphType === 'line'"
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
    <apexchart
      v-else-if="graphType === 'candlestick'"
      type="candlestick"
      :options="options"
      :series="series"
    ></apexchart>
    <div class="d-flex justify-content-between">
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="timeframe = 'Past Day'"
      >
        1D
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="timeframe = 'Past Week'"
      >
        1W
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="timeframe = 'Month to Date'"
      >
        MTD
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="timeframe = 'Past Month'"
      >
        1M
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="timeframe = 'Year to Date'"
      >
        YTD
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="timeframe = 'Past Year'"
      >
        1Y
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="timeframe = 'Past 5 Years'"
      >
        5Y
      </button>
    </div>
  </div>
</template>

<script>
const WEEKLY_TRADING_DAYS = 5;
const MONTHLY_TRADING_DAYS = 21;
const YEARLY_TRADING_DAYS = 253;
export default {
  name: "stock-line-candle",
  props: {
    name: {
      type: String,
      required: true,
    },
    intradayPrices: {
      type: Array,
      required: true,
    },
    dailyPrices: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      graphType: "line",
      timeframe: "Past Day",
      options: {
        chart: {
          toolbar: {
            show: false,
          },
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
            color: undefined,
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
    };
  },
  watch: {
    name: {
      handler(newName) {
        this.options.title.text = newName;
        this.updateSeries();
        this.updateOptions();
      },
      immediate: true,
    },
    timeframe() {
      this.updateSeries();
      this.updateOptions();
    },
    graphType() {
      this.updateSeries();
    },
  },
  computed: {
    apexIntradayPrices() {
      return this.intradayPrices.map((priceData) => {
        return {
          x: priceData.datetime,
          y: [priceData.open, priceData.high, priceData.low, priceData.close],
        };
      });
    },
    apexDailyPrices() {
      return this.dailyPrices.map((priceData) => {
        return {
          x: priceData.date,
          y: [priceData.open, priceData.high, priceData.low, priceData.close],
        };
      });
    },
    pastDay() {
      if (this.apexIntradayPrices.length === 0) return [];

      const today = new Date(
        this.apexIntradayPrices[this.apexIntradayPrices.length - 1].x
      );

      const todayStartIndex = this.apexIntradayPrices.findIndex((priceData) => {
        const datetime = new Date(priceData.x);
        return datetime.getDate() === today.getDate();
      });

      return this.apexIntradayPrices.slice(todayStartIndex);
    },
    pastWeek() {
      return this.apexDailyPrices.slice(-WEEKLY_TRADING_DAYS);
    },
    pastMTD() {
      if (this.apexDailyPrices.length === 0) return [];

      const currentYear = new Date(
        this.apexDailyPrices.slice(-1)[0].x
      ).getFullYear();

      const currentMonth = new Date(
        this.apexDailyPrices.slice(-1)[0].x
      ).getMonth();

      const monthStartIndex = this.apexDailyPrices.findIndex((priceData) => {
        const date = new Date(priceData.x);
        return (
          date.getFullYear() === currentYear && date.getMonth() === currentMonth
        );
      });

      return this.apexDailyPrices.slice(monthStartIndex);
    },
    pastMonth() {
      return this.apexDailyPrices.slice(-MONTHLY_TRADING_DAYS);
    },
    pastYTD() {
      if (this.apexDailyPrices.length === 0) return [];

      const currentYear = new Date(
        this.apexDailyPrices.slice(-1)[0].x
      ).getFullYear();

      const yearStartIndex = this.apexDailyPrices.findIndex((priceData) => {
        const date = new Date(priceData.x);
        return date.getFullYear() === currentYear;
      });

      return this.apexDailyPrices.slice(yearStartIndex);
    },
    pastYear() {
      return this.apexDailyPrices.slice(-YEARLY_TRADING_DAYS);
    },
    past5Years() {
      return this.apexDailyPrices.slice(-YEARLY_TRADING_DAYS * 5);
    },
    selectedData() {
      switch (this.timeframe) {
        case "Past Week":
          return this.pastWeek;
        case "Month to Date":
          return this.pastMTD;
        case "Past Month":
          return this.pastMonth;
        case "Year to Date":
          return this.pastYTD;
        case "Past Year":
          return this.pastYear;
        case "Past 5 Years":
          return this.past5Years;
        default:
          return this.pastDay;
      }
    },
    priceChange() {
      if (this.selectedData.length === 0) return 0;

      const startPrice = this.selectedData[0].y[3],
        endPrice = this.selectedData.slice(-1)[0].y[3];
      return (endPrice - startPrice).toFixed(4);
    },
    percentChange() {
      if (this.selectedData.length === 0) return 0;

      const startPrice = this.selectedData[0].y[3];
      if (startPrice === 0) return 0;
      return ((this.priceChange / startPrice) * 100).toFixed(2);
    },
  },
  methods: {
    updateSeries() {
      var priceData;
      if (this.graphType === "line") {
        priceData = this.selectedData.map((data) => {
          return {
            x: data.x,
            y: data.y[3],
          };
        });
      } else priceData = this.selectedData;

      const series = {
        name: this.name,
        data: priceData,
      };
      this.series = [series];
    },
    updateOptions() {
      const GREEN = "#00E396";
      const RED = "#EA3546";
      var lineColor, subtitleColor, subtitleText, dateFormat;

      // Set line and text color based on change in price.
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
      )}%) ${this.timeframe}`;

      // Set the tooltip to only show the full datetime when today's data is displayed.
      if (this.timeframe === "Past Day") dateFormat = "MMM dd h:mm TT";
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
  },
};
</script>