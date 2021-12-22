# InveStats

InveStats is a responsive single page application, where users can buy and sell from thousands of stocks. Featuring up-to-date price charts, financial data, and news so that users can make the most informed decision.

<img width="1437" alt="Screen Shot 2021-12-20 at 2 32 52 PM" src="https://user-images.githubusercontent.com/77894900/146835623-20ddb949-3747-4b96-a915-a69d18d5a18f.png">

## Demo

Demo of the app hosted at: https://investats2.herokuapp.com

## Features

* Stock price line and candlestick charts for past day, week, month, MTD, YTD, 1 year, and 5 year time intervals.
* Search, buy, and sell stocks by stock symbol or name.
* Get personal performance stats, and general stock performance stats.
* Donut chart visualizing total stock holdings.
* News ticker displaying most recent news for all stocks held.

## Technologies

* [MongoDB](https://www.mongodb.com)
* [mongoose](https://mongoosejs.com)
* [Express](https://expressjs.com)
* [Vue](https://v3.vuejs.org)
* [Node](https://nodejs.org/en/)
* [Bootstrap](https://getbootstrap.com)

## Getting Started

```bash
# Clone project 
git clone https://github.com/anle9650/InveStats.git

# Install dependencies
npm install

# Load sample data
node server/PortfolioSeed.js
node server/StockSeed.js

# Run local server
npm start
```

> Visit in browser: http://localhost:3000

## Directory Structure

```
├── client                         // client build
│   ├── vue.config.js              // config
│   ├── public                     // public assets
│   │   ├── favicon.ico            // favicon
│   │   └── index.html             // html template
│   ├── src                        // source code
│   │   ├── assets                 // static resource like themes, fonts
│   │   ├── components             // global public components
│   │   ├── App.vue                // entry view
│   │   └── main.js                // entry for loading components, initialization
│   ├── babel.config.js            // babel-loader config
│   ├── .gitignore                 // gitignore
│   └── package.json               // package.json
├── server                         // server build
│   ├── public                     // public assets 
│   │   ├── css                    // css
│   │   ├── js                     // js
│   │   ├── favicon.ico            // favicon
│   │   └── index.html             // html template
│   ├── models                     // models
│   ├── controllers                // controllers
│   ├── routes                     // request routes
│   ├── index.js                   // entry for server initialization
│   ├── portfolioSeed.js           // load sample portfolio
│   └── stockSeed.js               // load sample stocks
├── .gitignore                     // gitignore 
└── package.json                   // package.json
```

## Acknowledgments

* [apexcharts](https://apexcharts.com/docs/vue-charts/)
* [vue-carousel](https://www.npmjs.com/package/@chenfengyuan/vue-carousel)
* [Alpha Vantage](https://www.alphavantage.co)
* [News API](https://newsapi.org)
