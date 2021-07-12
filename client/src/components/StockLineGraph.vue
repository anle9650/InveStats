<template>
  <div>
    <apexchart type="line" :options="options" :series="series"></apexchart>
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
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        @click="showPast5Years"
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
  name: "stock-line-graph",
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
            color: "#9699a2",
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
  created() {
    this.options.title.text = this.name;
    this.showPastDay();
  },
  watch: {
    name(newName) {
      this.options.title.text = newName;
    },
    intradayPrices() {
      this.showPastDay();
    },
  },
  computed: {
    priceChange() {
      if (this.series.length > 0) {
        let startPrice = this.series[0].data[0].y,
          endPrice = this.series[0].data.slice(-1)[0].y;
        return (endPrice - startPrice).toFixed(4);
      }
      return 0;
    },
    percentChange() {
      if (this.series.length > 0) {
        let startPrice = this.series[0].data[0].y;
        if (startPrice != 0)
          return ((this.priceChange / startPrice) * 100).toFixed(2);
      }
      return 0;
    },
  },
  methods: {
    updateSeries(priceData) {
      let series = {
        name: this.name,
        data: priceData,
      };
      this.series = [series];
    },
    updateChart(priceData, timeFrame) {
      const GREEN = "#00E396";
      const RED = "#EA3546";
      var lineColor, subtitleColor, subtitleText, dateFormat;
      
      this.updateSeries(priceData);

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
      )}%) ${timeFrame}`;

      // Set the tooltip to only show the full datetime when yesterday's data is displayed.
      if (timeFrame === "Yesterday") dateFormat = "h:mm TT";
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
    showPastDay() {
      this.updateChart(this.intradayPrices, "Yesterday");
    },
    showPastWeek() {
      let pastWeekPrices = this.dailyPrices.slice(-WEEKLY_TRADING_DAYS);
      this.updateChart(pastWeekPrices, "Past Week");
    },
    showPastMonth() {
      let pastMonthPrices = this.dailyPrices.slice(-MONTHLY_TRADING_DAYS);
      this.updateChart(pastMonthPrices, "Past Month");
    },
    showPastYear() {
      let pastYearPrices = this.dailyPrices.slice(-YEARLY_TRADING_DAYS);
      this.updateChart(pastYearPrices, "Past Year");
    },
    showPast5Years() {
      let past5YearPrices = this.dailyPrices.slice(-YEARLY_TRADING_DAYS * 5);
      this.updateChart(past5YearPrices, "Past 5 Years");
    },
  },
};
</script>
