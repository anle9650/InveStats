<template>
  <apexchart type="candlestick" :options="options" :series="series"></apexchart>
</template>

<script>
const WEEKLY_TRADING_DAYS = 5;
const MONTHLY_TRADING_DAYS = 21;
const YEARLY_TRADING_DAYS = 253;
export default {
  name: "stock-candlestick",
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
    timeframe: {
      type: String,
      default: "pastDay",
      validator: (value) =>
        [
          "pastDay",
          "pastWeek",
          "MTD",
          "pastMonth",
          "YTD",
          "pastYear",
          "past5Years",
        ].includes(value),
    },
  },
  data() {
    return {
      options: {
        chart: {
          id: "stock-candlestick",
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
    if (this.timeframe == "pastDay") this.showPastDay();
    else if (this.timeframe == "pastWeek") this.showPastWeek();
    else if (this.timeframe == "MTD") this.showMTD();
    else if (this.timeframe == "pastMonth") this.showPastMonth();
    else if (this.timeframe == "YTD") this.showYTD();
    else if (this.timeframe == "pastYear") this.showPastYear();
    else if (this.timeframe == "past5Years") this.showPast5Years();
  },
  watch: {
    name(newName) {
      this.options.title.text = newName;
    },
    intradayPrices() {
      // this.showPastDay();
      if (this.timeframe == "pastDay") this.showPastDay();
      else if (this.timeframe == "pastWeek") this.showPastWeek();
      else if (this.timeframe == "MTD") this.showMTD();
      else if (this.timeframe == "pastMonth") this.showPastMonth();
      else if (this.timeframe == "YTD") this.showYTD();
      else if (this.timeframe == "pastYear") this.showPastYear();
      else if (this.timeframe == "past5Years") this.showPast5Years();
    },
    timeframe(newTimeframe) {
      if (newTimeframe == "pastDay") this.showPastDay();
      else if (newTimeframe == "pastWeek") this.showPastWeek();
      else if (newTimeframe == "MTD") this.showMTD();
      else if (newTimeframe == "pastMonth") this.showPastMonth();
      else if (newTimeframe == "YTD") this.showYTD();
      else if (newTimeframe == "pastYear") this.showPastYear();
      else if (newTimeframe == "past5Years") this.showPast5Years();
    },
  },
  computed: {
    priceChange() {
      if (this.series.length === 0) return 0;

      let startPrice = this.series[0].data[0].y[3],
        endPrice = this.series[0].data.slice(-1)[0].y[3];
      return (endPrice - startPrice).toFixed(4);
    },
    percentChange() {
      if (this.series.length === 0) return 0;

      let startPrice = this.series[0].data[0].y[3];
      if (startPrice != 0)
        return ((this.priceChange / startPrice) * 100).toFixed(2);
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
      var subtitleColor, subtitleText, dateFormat;

      this.updateSeries(priceData);

      // Set text color based on change in price.
      if (this.priceChange >= 0) {
        subtitleColor = GREEN;
        subtitleText = "+$";
      } else {
        subtitleColor = RED;
        subtitleText = "-$";
      }

      // Set the subtitle text to display change in price.
      subtitleText += `${Math.abs(this.priceChange)} (${Math.abs(
        this.percentChange
      )}%) ${timeFrame}`;

      // Set the tooltip to only show the full datetime when today's data is displayed.
      if (timeFrame === "Past Day") dateFormat = "h:mm TT";
      else dateFormat = "MMM dd yyyy";

      // Update options.
      this.options = {
        ...this.options,
        ...{
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
      let today = new Date(
          this.intradayPrices[this.intradayPrices.length - 1].x
        ),
        todayStartIndex = this.intradayPrices.findIndex((priceData) => {
          let datetime = new Date(priceData.x);
          return datetime.getDate() === today.getDate();
        }),
        todayPrices = this.intradayPrices.slice(todayStartIndex);

      this.updateChart(todayPrices, "Past Day");
    },
    showPastWeek() {
      let pastWeekPrices = this.dailyPrices.slice(-WEEKLY_TRADING_DAYS);
      this.updateChart(pastWeekPrices, "Past Week");
    },
    showMTD() {
      let currentYear = new Date(this.dailyPrices.slice(-1)[0].x).getFullYear(),
        currentMonth = new Date(this.dailyPrices.slice(-1)[0].x).getMonth(),
        monthStartIndex = this.dailyPrices.findIndex((priceData) => {
          let date = new Date(priceData.x);
          return (
            date.getFullYear() === currentYear &&
            date.getMonth() === currentMonth
          );
        }),
        pricesMTD = this.dailyPrices.slice(monthStartIndex);

      this.updateChart(pricesMTD, "Month to Date");
    },
    showPastMonth() {
      let pastMonthPrices = this.dailyPrices.slice(-MONTHLY_TRADING_DAYS);
      this.updateChart(pastMonthPrices, "Past Month");
    },
    showYTD() {
      let currentYear = new Date(this.dailyPrices.slice(-1)[0].x).getFullYear(),
        yearStartIndex = this.dailyPrices.findIndex((priceData) => {
          let date = new Date(priceData.x);
          return date.getFullYear() === currentYear;
        }),
        pricesYTD = this.dailyPrices.slice(yearStartIndex);

      this.updateChart(pricesYTD, "Year to Date");
    },
    showPastYear() {
      let pastYearPrices = this.dailyPrices.slice(-YEARLY_TRADING_DAYS);
      this.updateChart(pastYearPrices, "Past Year");
    },
    showPast5Years() {
      let past5YearsPrices = this.dailyPrices.slice(-YEARLY_TRADING_DAYS * 5);
      this.updateChart(past5YearsPrices, "Past 5 Years");
    },
  },
};
</script>
