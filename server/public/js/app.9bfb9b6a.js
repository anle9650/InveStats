(function(e){function t(t){for(var n,a,o=t[0],i=t[1],l=t[2],u=0,d=[];u<o.length;u++)a=o[u],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&d.push(c[a][0]),c[a]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);b&&b(t);while(d.length)d.shift()();return r.push.apply(r,l||[]),s()}function s(){for(var e,t=0;t<r.length;t++){for(var s=r[t],n=!0,a=1;a<s.length;a++){var o=s[a];0!==c[o]&&(n=!1)}n&&(r.splice(t--,1),e=i(i.s=s[0]))}return e}var n={},a={app:0},c={app:0},r=[];function o(e){return i.p+"js/"+({"shares-input-modal":"shares-input-modal","stock-news-carousel":"stock-news-carousel","vue-carousel":"vue-carousel"}[e]||e)+"."+{"shares-input-modal":"e6c3f5d8","stock-news-carousel":"40cfc09d","vue-carousel":"c816af88"}[e]+".js"}function i(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.e=function(e){var t=[],s={"stock-news-carousel":1};a[e]?t.push(a[e]):0!==a[e]&&s[e]&&t.push(a[e]=new Promise((function(t,s){for(var n="css/"+({"shares-input-modal":"shares-input-modal","stock-news-carousel":"stock-news-carousel","vue-carousel":"vue-carousel"}[e]||e)+"."+{"shares-input-modal":"31d6cfe0","stock-news-carousel":"2c04e57a","vue-carousel":"31d6cfe0"}[e]+".css",c=i.p+n,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var l=r[o],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===c))return t()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){l=d[o],u=l.getAttribute("data-href");if(u===n||u===c)return t()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=t,b.onerror=function(t){var n=t&&t.target&&t.target.src||c,r=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=n,delete a[e],b.parentNode.removeChild(b),s(r)},b.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(b)})).then((function(){a[e]=0})));var n=c[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,s){n=c[e]=[t,s]}));t.push(n[2]=r);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=o(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(b);var s=c[e];if(0!==s){if(s){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",d.name="ChunkLoadError",d.type=n,d.request=a,s[1](d)}c[e]=void 0}};var b=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var b=u;r.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"0ee9":function(e,t,s){},"12f5":function(e,t,s){},"3e8d":function(e,t,s){"use strict";s("0ee9")},5682:function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var n=s("f2bf"),a=(s("d81d"),s("ac1f"),s("1276"),s("7a23")),c=Object(a["withScopeId"])("data-v-7f0d58c9");Object(a["pushScopeId"])("data-v-7f0d58c9");var r={class:"container"},o={class:"row mt-4"},i={class:"col-lg-8"},l={key:0,class:"d-flex justify-content-center"},u=Object(a["createVNode"])("div",{class:"spinner-border me-2",role:"status"},[Object(a["createVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),d=Object(a["createVNode"])("span",null,"Loading...",-1),b={key:1,class:"alert alert-danger",role:"alert"},h={key:2,class:"shadow card mb-3"},p={class:"card-body"},y={class:"row"},f={class:"col-lg-6"},m={class:"shadow card mb-3"},k={class:"card-body"},O={class:"card-title d-flex justify-content-between"},j={class:"card-subtitle mb-2 text-muted"},g={class:"col-lg-6"},S={class:"shadow card mb-3"},v={class:"card-body"},w={class:"col-lg-4"},V={class:"mb-3"},P={key:0,class:"\n          alert alert-success alert-dismissible\n          fade\n          show\n          position-sticky\n          bottom-0\n        ",role:"alert"},N=Object(a["createVNode"])("i",{class:"bi bi-check-circle me-2"},null,-1),x=Object(a["createVNode"])("strong",null,"Success",-1),D=Object(a["createTextVNode"])(" Your transaction is complete. "),T=Object(a["createVNode"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"},null,-1);Object(a["popScopeId"])();var C=c((function(e,t,s,n,C,B){var M=Object(a["resolveComponent"])("stock-line-candle"),I=Object(a["resolveComponent"])("stock-stats-display"),R=Object(a["resolveComponent"])("stock-performance-display"),A=Object(a["resolveComponent"])("apexchart"),Y=Object(a["resolveComponent"])("stock-news-carousel"),F=Object(a["resolveComponent"])("stock-search"),E=Object(a["resolveComponent"])("stocks-list");return Object(a["openBlock"])(),Object(a["createBlock"])("div",r,[Object(a["createVNode"])("div",o,[Object(a["createVNode"])("div",i,[Object(a["createVNode"])(a["Transition"],{name:"slide-fade",mode:"out-in"},{default:c((function(){return[C.loading&&0===B.selectedIntradayPrices.length?(Object(a["openBlock"])(),Object(a["createBlock"])("div",l,[u,d])):C.loading||0!==B.selectedIntradayPrices.length&&0!==B.selectedDailyPrices.length?(Object(a["openBlock"])(),Object(a["createBlock"])("div",h,[Object(a["createVNode"])("div",p,[Object(a["createVNode"])(M,{name:B.selectedSymbol,intradayPrices:B.selectedIntradayPrices,dailyPrices:B.selectedDailyPrices},null,8,["name","intradayPrices","dailyPrices"])])])):(Object(a["openBlock"])(),Object(a["createBlock"])("div",b," Maximum API calls exceeded. Please try again in 60 seconds, or use demo stock (IBM). "))]})),_:1}),Object(a["createVNode"])("div",y,[Object(a["createVNode"])("div",f,[Object(a["createVNode"])("div",m,[Object(a["createVNode"])("div",k,[Object(a["createVNode"])("h5",O,[Object(a["createTextVNode"])(Object(a["toDisplayString"])(C.showStats?"Stats":"Personal Performance")+" ",1),Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:t[1]||(t[1]=function(e){return C.showStats=!C.showStats})},Object(a["toDisplayString"])(C.showStats?"Personal Performance":"Stats"),1)]),Object(a["createVNode"])("h6",j,Object(a["toDisplayString"])(B.selectedSymbol),1),C.showStats?(Object(a["openBlock"])(),Object(a["createBlock"])(I,{key:0,dailyPrices:B.selectedDailyPrices},null,8,["dailyPrices"])):(Object(a["openBlock"])(),Object(a["createBlock"])(R,{key:1,stocks:C.stocks.map((function(e){return{shares:e.shares,transactions:e.transactions,intradayPrices:e.intradayPrices}})),selectedStockIndex:C.selectedStockIndex},null,8,["stocks","selectedStockIndex"]))])])]),Object(a["createVNode"])("div",g,[Object(a["createVNode"])("div",S,[Object(a["createVNode"])("div",v,[Object(a["createVNode"])(A,{type:"donut",options:C.donutChartOptions,series:B.allStockHoldings,onDataPointSelection:t[2]||(t[2]=function(e,t,s){return C.selectedStockIndex=s.dataPointIndex})},null,8,["options","series"])])])])]),B.mostRecentDate?(Object(a["openBlock"])(),Object(a["createBlock"])(Y,{key:0,class:"shadow mb-3",stockSymbol:B.selectedSymbol.split(".")[0],date:B.mostRecentDate},null,8,["stockSymbol","date"])):Object(a["createCommentVNode"])("",!0)]),Object(a["createVNode"])("div",w,[Object(a["createVNode"])("div",V,[Object(a["createVNode"])(F,{stocksOwned:C.stocks.map((function(e){return{symbol:e.symbol,shares:e.shares}})),onBuyStock:B.addShares,onSellStock:B.removeShares},null,8,["stocksOwned","onBuyStock","onSellStock"])]),Object(a["createVNode"])(E,{stocks:C.stocks.map((function(e){return{symbol:e.symbol,shares:e.shares,intradayPrices:e.intradayPrices}})),onSelectStock:t[3]||(t[3]=function(e){return C.selectedStockIndex=e}),onBuyStock:B.addShares,onSellStock:B.removeShares},null,8,["stocks","onBuyStock","onSellStock"])])]),Object(a["createVNode"])(a["Transition"],{name:"slide-fade"},{default:c((function(){return[C.transactionComplete?(Object(a["openBlock"])(),Object(a["createBlock"])("div",P,[N,x,D,T])):Object(a["createCommentVNode"])("",!0)]})),_:1})])})),B=s("2909"),M=s("1da1"),I=s("5530"),R=(s("96cf"),s("d3b7"),s("3ca3"),s("ddb0"),s("b680"),s("159b"),s("fb6a"),s("99af"),s("5319"),s("4e82"),s("7db0"),{style:{display:"contents"}}),A={class:"d-flex justify-content-end"},Y=Object(a["createVNode"])("i",{class:"bi bi-align-center"},null,-1),F=Object(a["createVNode"])("i",{class:"bi bi-graph-up",style:{color:"unset","font-size":"unset"}},null,-1),E={class:"d-flex justify-content-between"};function _(e,t,s,n,c,r){var o=Object(a["resolveComponent"])("apexchart");return Object(a["openBlock"])(),Object(a["createBlock"])("div",R,[Object(a["createVNode"])("div",A,[Object(a["withDirectives"])(Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:t[1]||(t[1]=function(e){return c.graphType="candlestick"})},[Y],512),[[a["vShow"],"line"==c.graphType]]),Object(a["withDirectives"])(Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:t[2]||(t[2]=function(e){return c.graphType="line"})},[F],512),[[a["vShow"],"candlestick"==c.graphType]])]),"line"===c.graphType?(Object(a["openBlock"])(),Object(a["createBlock"])(o,{key:0,type:"line",options:c.options,series:c.series},null,8,["options","series"])):"candlestick"===c.graphType?(Object(a["openBlock"])(),Object(a["createBlock"])(o,{key:1,type:"candlestick",options:c.options,series:c.series},null,8,["options","series"])):Object(a["createCommentVNode"])("",!0),Object(a["createVNode"])("div",E,[Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-secondary btn-sm",onClick:t[3]||(t[3]=function(e){return c.timeframe="Past Day"})}," 1D "),Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-secondary btn-sm",onClick:t[4]||(t[4]=function(e){return c.timeframe="Past Week"})}," 1W "),Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-secondary btn-sm",onClick:t[5]||(t[5]=function(e){return c.timeframe="Month to Date"})}," MTD "),Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-secondary btn-sm",onClick:t[6]||(t[6]=function(e){return c.timeframe="Past Month"})}," 1M "),Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-secondary btn-sm",onClick:t[7]||(t[7]=function(e){return c.timeframe="Year to Date"})}," YTD "),Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-secondary btn-sm",onClick:t[8]||(t[8]=function(e){return c.timeframe="Past Year"})}," 1Y "),Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-secondary btn-sm",onClick:t[9]||(t[9]=function(e){return c.timeframe="Past 5 Years"})}," 5Y ")])])}s("c740"),s("b0c0");var L=5,$=21,G=253,z={name:"stock-line-candle",props:{name:{type:String,required:!0},intradayPrices:{type:Array,required:!0},dailyPrices:{type:Array,required:!0}},data:function(){return{graphType:"line",timeframe:"Past Day",options:{chart:{toolbar:{show:!1},zoom:{enabled:!1}},title:{text:void 0,style:{fontSize:"20px"}},subtitle:{text:void 0,style:{color:void 0}},xaxis:{type:"datetime",labels:{show:!1,datetimeUTC:!1}},colors:void 0,stroke:{width:1},tooltip:{x:{format:"MMM dd yyyy, h:mmTT"}}},series:[]}},watch:{name:{handler:function(e){this.options.title.text=e,this.updateSeries(),this.updateOptions()},immediate:!0},timeframe:function(){this.updateSeries(),this.updateOptions()},graphType:function(){this.updateSeries()}},computed:{apexIntradayPrices:function(){return this.intradayPrices.map((function(e){return{x:e.datetime,y:[e.open,e.high,e.low,e.close]}}))},apexDailyPrices:function(){return this.dailyPrices.map((function(e){return{x:e.date,y:[e.open,e.high,e.low,e.close]}}))},pastDay:function(){if(0===this.apexIntradayPrices.length)return[];var e=new Date(this.apexIntradayPrices[this.apexIntradayPrices.length-1].x),t=this.apexIntradayPrices.findIndex((function(t){var s=new Date(t.x);return s.getDate()===e.getDate()})),s=this.apexIntradayPrices.slice(t);return s},pastWeek:function(){var e=this.apexDailyPrices.slice(-L);return e},pastMTD:function(){if(0===this.apexDailyPrices.length)return[];var e=new Date(this.apexDailyPrices.slice(-1)[0].x).getFullYear(),t=new Date(this.apexDailyPrices.slice(-1)[0].x).getMonth(),s=this.apexDailyPrices.findIndex((function(s){var n=new Date(s.x);return n.getFullYear()===e&&n.getMonth()===t})),n=this.apexDailyPrices.slice(s);return n},pastMonth:function(){var e=this.apexDailyPrices.slice(-$);return e},pastYTD:function(){if(0===this.apexDailyPrices.length)return[];var e=new Date(this.apexDailyPrices.slice(-1)[0].x).getFullYear(),t=this.apexDailyPrices.findIndex((function(t){var s=new Date(t.x);return s.getFullYear()===e})),s=this.apexDailyPrices.slice(t);return s},pastYear:function(){var e=this.apexDailyPrices.slice(-G);return e},past5Years:function(){var e=this.apexDailyPrices.slice(5*-G);return e},selectedData:function(){switch(this.timeframe){case"Past Week":return this.pastWeek;case"Month to Date":return this.pastMTD;case"Past Month":return this.pastMonth;case"Year to Date":return this.pastYTD;case"Past Year":return this.pastYear;case"Past 5 Years":return this.past5Years;default:return this.pastDay}},priceChange:function(){if(0===this.selectedData.length)return 0;var e=this.selectedData[0].y[3],t=this.selectedData.slice(-1)[0].y[3];return(t-e).toFixed(4)},percentChange:function(){if(0===this.selectedData.length)return 0;var e=this.selectedData[0].y[3];return 0===e?0:(this.priceChange/e*100).toFixed(2)}},methods:{updateSeries:function(){var e;e="line"===this.graphType?this.selectedData.map((function(e){return{x:e.x,y:e.y[3]}})):this.selectedData;var t={name:this.name,data:e};this.series=[t]},updateOptions:function(){var e,t,s,n,a="#00E396",c="#EA3546";this.priceChange>=0?(e=a,t=a,s="+$"):(e=c,t=c,s="-$"),s+="".concat(Math.abs(this.priceChange)," (").concat(Math.abs(this.percentChange),"%) ").concat(this.timeframe),n="Past Day"===this.timeframe?"MMM dd h:mm TT":"MMM dd yyyy",this.options=Object(I["a"])(Object(I["a"])({},this.options),{colors:[e],subtitle:{text:s,style:{color:t}},tooltip:{x:{format:n}}})}}};z.render=_;var q=z,H={class:"input-group"},W={id:"datalistOptions"},K=Object(a["createVNode"])("i",{class:"bi bi-search",id:"search-button"},null,-1),U={class:"modal fade",id:"searchResultsModal",tabindex:"-1","aria-labelledby":"searchResultsModal","aria-hidden":"true"},J={class:"modal-dialog"},Q={class:"modal-content"},X=Object(a["createVNode"])("div",{class:"modal-header"},[Object(a["createVNode"])("h5",{class:"modal-title",id:"searchResultsModalLabel"}," Search Results "),Object(a["createVNode"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),Z={class:"modal-body"},ee={key:0},te={class:"list-group list-group-flush"},se={class:"d-flex w-100 justify-content-between"},ne={class:"text-muted"};function ae(e,t,s,n,c,r){var o=Object(a["resolveComponent"])("shares-input-modal");return Object(a["openBlock"])(),Object(a["createBlock"])("div",null,[Object(a["createVNode"])("div",H,[Object(a["withDirectives"])(Object(a["createVNode"])("input",{type:"text",class:"form-control",placeholder:"Search stocks","aria-label":"Search stocks","aria-describedby":"search-button",list:"datalistOptions","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.searchValue=e})},null,512),[[a["vModelText"],c.searchValue]]),Object(a["createVNode"])("datalist",W,[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(c.searchExamples,(function(e,t){return Object(a["openBlock"])(),Object(a["createBlock"])("option",{key:t,value:e},null,8,["value"])})),128))]),Object(a["createVNode"])("button",{type:"button",class:"btn btn-outline-secondary btn-sm","data-bs-toggle":"modal","data-bs-target":"#searchResultsModal",onClick:t[2]||(t[2]=function(){return r.fetchSearchResults&&r.fetchSearchResults.apply(r,arguments)})},[K])]),Object(a["createVNode"])("div",U,[Object(a["createVNode"])("div",J,[Object(a["createVNode"])("div",Q,[X,Object(a["createVNode"])("div",Z,[0===c.searchResults.length?(Object(a["openBlock"])(),Object(a["createBlock"])("span",ee,"No results found.")):Object(a["createCommentVNode"])("",!0),Object(a["createVNode"])("ul",te,[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(c.searchResults,(function(e,t){return Object(a["openBlock"])(),Object(a["createBlock"])("li",{class:"list-group-item",key:t},[Object(a["createVNode"])("div",se,[Object(a["createVNode"])("h6",null,Object(a["toDisplayString"])(e.symbol),1),Object(a["createVNode"])("div",null,[Object(a["createVNode"])("button",{class:"btn btn-outline-primary btn-sm me-1","data-bs-target":"#searchResultsBuyModal","data-bs-toggle":"modal","data-bs-dismiss":"modal",onClick:function(t){return c.stockToBuy=e}}," Buy ",8,["onClick"]),Object(a["createVNode"])("button",{class:"btn btn-outline-primary btn-sm","data-bs-target":"#searchResultsSellModal","data-bs-toggle":"modal","data-bs-dismiss":"modal",disabled:0===r.getSharesOwned(e),onClick:function(t){return c.stockToSell=e}}," Sell ",8,["disabled","onClick"])])]),Object(a["createVNode"])("small",ne,Object(a["toDisplayString"])(e.name),1)])})),128))])])])])]),Object(a["createVNode"])(o,{id:"searchResultsBuyModal",type:"buy",symbol:c.stockToBuy?c.stockToBuy.symbol:null,previousModal:"#searchResultsModal",onConfirmShares:t[3]||(t[3]=function(t){return e.$emit("buyStock",c.stockToBuy?c.stockToBuy.symbol:null,t)})},null,8,["symbol"]),Object(a["createVNode"])(o,{id:"searchResultsSellModal",type:"sell",symbol:c.stockToSell?c.stockToSell.symbol:null,sharesOwned:c.stockToSell?c.stockToSell.shares:0,previousModal:"#searchResultsModal",onConfirmShares:t[4]||(t[4]=function(t){return e.$emit("sellStock",c.stockToSell?c.stockToSell.symbol:null,t)})},null,8,["symbol","sharesOwned"])])}s("caad"),s("2532");var ce=Object(a["defineAsyncComponent"])((function(){return s.e("shares-input-modal").then(s.bind(null,"bdc9"))})),re={name:"stock-search",components:{SharesInputModal:ce},props:{stocksOwned:{type:Array,default:function(){return[]}}},emits:["buyStock","sellStock"],data:function(){return{apiKey:"1V4VMMH8KUPV4I15",searchExamples:["tesco","tencent","BA","SAIC"],searchValue:null,searchValueChange:!1,searchResults:[],stockToBuy:null,stockToSell:null}},watch:{searchValue:function(){this.searchValueChange=!0},searchResults:function(){this.searchValueChange=!1}},methods:{fetchSearchResults:function(){var e=this;this.searchValueChange&&fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=".concat(this.searchValue,"&apikey=").concat(this.searchExamples.includes(this.searchValue)?"demo":this.apiKey)).then((function(e){return e.json()})).then((function(t){t.bestMatches?e.searchResults=t.bestMatches.map((function(e){return{symbol:e["1. symbol"],name:e["2. name"]}})):e.searchResults=[]})).catch((function(e){return console.log(e)}))},getSharesOwned:function(e){var t=this.stocksOwned.find((function(t){return t.symbol===e.symbol}));return t?t.shares:0}}};re.render=ae;var oe=re,ie=Object(a["withScopeId"])("data-v-79736671");Object(a["pushScopeId"])("data-v-79736671");var le={style:{display:"contents"}},ue={class:"shadow card sticky-menu"},de=Object(a["createVNode"])("div",{class:"card-body"},[Object(a["createVNode"])("h5",{class:"card-title"},"Stocks")],-1),be={class:"list-group list-group-flush"},he={class:"d-flex w-100 justify-content-between"},pe={class:"mb-1"},ye={class:"text-muted"},fe={class:"mb-1"},me={class:"d-flex w-100 justify-content-between"},ke={class:"text-muted"};Object(a["popScopeId"])();var Oe=ie((function(e,t,s,n,c,r){var o=Object(a["resolveComponent"])("shares-input-modal");return Object(a["openBlock"])(),Object(a["createBlock"])("div",le,[Object(a["createVNode"])("div",ue,[de,Object(a["createVNode"])("div",be,[Object(a["createVNode"])(a["TransitionGroup"],{name:"list"},{default:ie((function(){return[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(s.stocks,(function(t,s){return Object(a["openBlock"])(),Object(a["createBlock"])("a",{href:"#",class:"list-group-item list-group-item-action",key:s,onClick:function(t){return e.$emit("selectStock",s)}},[Object(a["createVNode"])("div",he,[Object(a["createVNode"])("h6",pe,Object(a["toDisplayString"])(t.symbol),1),Object(a["createVNode"])("small",ye,[Object(a["createVNode"])("i",{class:[r.getPriceChange(t)>=0?c.upArrow:c.downArrow]},null,2),Object(a["createTextVNode"])(" $"+Object(a["toDisplayString"])(Math.abs(r.getPriceChange(t)))+" ("+Object(a["toDisplayString"])(Math.abs(r.getPercentChange(t)))+"%) Past Day ",1)])]),Object(a["createVNode"])("p",fe,"$"+Object(a["toDisplayString"])(r.getEndPrice(t)),1),Object(a["createVNode"])("div",me,[Object(a["createVNode"])("small",ke,Object(a["toDisplayString"])(t.shares)+" "+Object(a["toDisplayString"])(1===t.shares?"share":"shares"),1),Object(a["createVNode"])("div",null,[Object(a["createVNode"])("button",{class:"btn btn-outline-primary btn-sm me-1","data-bs-target":"#buySharesInputModal","data-bs-toggle":"modal","data-bs-dismiss":"modal",disabled:0===r.getEndPrice(t),onClick:function(e){return c.stockToBuy=t}}," Buy ",8,["disabled","onClick"]),Object(a["createVNode"])("button",{class:"btn btn-outline-primary btn-sm","data-bs-target":"#sellSharesInputModal","data-bs-toggle":"modal","data-bs-dismiss":"modal",disabled:0===t.shares||0===r.getEndPrice(t),onClick:function(e){return c.stockToSell=t}}," Sell ",8,["disabled","onClick"])])])],8,["onClick"])})),128))]})),_:1})])]),Object(a["createVNode"])(o,{id:"buySharesInputModal",type:"buy",symbol:c.stockToBuy?c.stockToBuy.symbol:null,onConfirmShares:t[1]||(t[1]=function(t){return e.$emit("buyStock",c.stockToBuy?c.stockToBuy.symbol:null,t)})},null,8,["symbol"]),Object(a["createVNode"])(o,{id:"sellSharesInputModal",type:"sell",symbol:c.stockToSell?c.stockToSell.symbol:null,sharesOwned:c.stockToSell?c.stockToSell.shares:0,onConfirmShares:t[2]||(t[2]=function(t){return e.$emit("sellStock",c.stockToSell?c.stockToSell.symbol:null,t)})},null,8,["symbol","sharesOwned"])])})),je=Object(a["defineAsyncComponent"])((function(){return s.e("shares-input-modal").then(s.bind(null,"bdc9"))})),ge={components:{SharesInputModal:je},name:"stocks-list",props:{stocks:Array},emits:["selectStock","buyStock","sellStock"],data:function(){return{upArrow:"bi bi-arrow-up-circle",downArrow:"bi bi-arrow-down-circle",stockToBuy:null,stockToSell:null}},methods:{getStartPrice:function(e){if("undefined"===typeof e.intradayPrices||0===e.intradayPrices.length)return 0;var t=new Date(e.intradayPrices.slice(-1)[0].datetime).getDate(),s=e.intradayPrices.findIndex((function(e){var s=new Date(e.datetime).getDate();return s===t}));return e.intradayPrices[s].close},getEndPrice:function(e){return"undefined"===typeof e.intradayPrices||0===e.intradayPrices.length?0:e.intradayPrices.slice(-1)[0].close},getPriceChange:function(e){var t=this.getStartPrice(e),s=this.getEndPrice(e);return(s-t).toFixed(2)},getPercentChange:function(e){var t=this.getPriceChange(e),s=this.getStartPrice(e);return 0===s?null:(t/s*100).toFixed(2)}}};s("3e8d");ge.render=Oe,ge.__scopeId="data-v-79736671";var Se=ge,ve=Object(a["withScopeId"])("data-v-4d037b14");Object(a["pushScopeId"])("data-v-4d037b14");var we={class:"list-group list-group-flush"},Ve={class:"list-group-item d-flex w-100 justify-content-between"},Pe=Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:"bi bi-pie-chart-fill text-secondary me-2"}),Object(a["createTextVNode"])(" Shares ")],-1),Ne={class:"list-group-item d-flex w-100 justify-content-between"},xe=Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:"bi bi-percent text-secondary me-2"}),Object(a["createTextVNode"])(" Portfolio Diversity ")],-1),De={class:"list-group-item d-flex w-100 justify-content-between"},Te=Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:"bi bi-cash text-success me-2"}),Object(a["createTextVNode"])(" Market Value ")],-1),Ce={class:"list-group-item d-flex w-100 justify-content-between"},Be=Object(a["createTextVNode"])(" Average Cost "),Me={class:"list-group-item d-flex w-100 justify-content-between"},Ie=Object(a["createTextVNode"])(" Past Day Returns "),Re={class:"list-group-item d-flex w-100 justify-content-between"},Ae=Object(a["createTextVNode"])(" Total Returns ");Object(a["popScopeId"])();var Ye=ve((function(e,t,s,n,c,r){return Object(a["openBlock"])(),Object(a["createBlock"])("ul",we,[Object(a["createVNode"])("li",Ve,[Pe,Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(r.stockShares),1)]),Object(a["createVNode"])("li",Ne,[xe,Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(r.stockDiversity)+"%",1)]),Object(a["createVNode"])("li",De,[Te,Object(a["createVNode"])("span",null,"$"+Object(a["toDisplayString"])(r.stockValue),1)]),Object(a["createVNode"])("li",Ce,[Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:[r.stockAverageCost>=r.stockPrice?c.upArrow:c.downArrow,"me-2"]},null,2),Be]),Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(r.stockAverageCost>=0?"":"-")+"$"+Object(a["toDisplayString"])(Math.abs(r.stockAverageCost)),1)]),Object(a["createVNode"])("li",Me,[Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:[r.stockDayReturns>=0?c.upGraph:c.downGraph,"me-2"]},null,2),Ie]),Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(r.stockDayReturns>=0?"":"-")+"$"+Object(a["toDisplayString"])(Math.abs(r.stockDayReturns)),1)]),Object(a["createVNode"])("li",Re,[Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:[r.stockTotalReturns>=0?c.upGraph:c.downGraph,"me-2"]},null,2),Ae]),Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(r.stockTotalReturns>=0?"":"-")+"$"+Object(a["toDisplayString"])(Math.abs(r.stockTotalReturns)),1)])])})),Fe=(s("a9e3"),{name:"stock-performance-display",props:{stocks:{type:Array,required:!0},selectedStockIndex:{type:Number,required:!0}},data:function(){return{upArrow:"bi bi-arrow-up-circle",downArrow:"bi bi-arrow-down-circle",upGraph:"bi bi-graph-up",downGraph:"bi bi-graph-down"}},computed:{selectedStock:function(){return this.stocks[this.selectedStockIndex]},stockPrice:function(){return 0===this.stocks.length||"undefined"===typeof this.selectedStock.intradayPrices||0===this.selectedStock.intradayPrices.length?0:this.selectedStock.intradayPrices.slice(-1)[0].close},stockShares:function(){return 0===this.stocks.length?0:this.selectedStock.shares},stockTotalCost:function(){return 0===this.stocks.length?0:this.selectedStock.transactions.reduce((function(e,t){return e+t.price*t.shares}),0)},stockAverageCost:function(){return 0===this.stocks.length?0:0===this.stockShares?this.stockTotalCost:(this.stockTotalCost/this.stockShares).toFixed(2)},stockValue:function(){return(this.stockPrice*this.stockShares).toFixed(2)},stockDiversity:function(){var e=this.allStockHoldings.reduce((function(e,t){return e+t}),0);return 0===e?0:(this.stockValue/e*100).toFixed(2)},stockDayReturns:function(){if(0===this.stocks.length||"undefined"===typeof this.selectedStock.intradayPrices||0===this.selectedStock.intradayPrices.length)return 0;var e=new Date(this.selectedStock.intradayPrices.slice(-1)[0].datetime),t=this.selectedStock.intradayPrices.findIndex((function(t){var s=new Date(t.datetime);return s.getDate()===e.getDate()})),s=this.selectedStock.intradayPrices[t].close;return((this.stockPrice-s)*this.stockShares).toFixed(2)},stockTotalReturns:function(){return(this.stockValue-this.stockTotalCost).toFixed(2)},allStockHoldings:function(){var e=this.stocks.map((function(e){if("undefined"===typeof e.intradayPrices||0===e.intradayPrices.length)return 0;var t=e.intradayPrices.slice(-1)[0].close;return e.shares*t}));return e}}});s("f44b");Fe.render=Ye,Fe.__scopeId="data-v-4d037b14";var Ee=Fe,_e={class:"list-group list-group-flush"},Le={class:"list-group-item d-flex w-100 justify-content-between"},$e=Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:"bi bi-arrow-left-right text-secondary me-2"}),Object(a["createTextVNode"])(" Volume ")],-1),Ge={class:"list-group-item d-flex w-100 justify-content-between"},ze=Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:"bi bi-arrow-up-circle me-2"}),Object(a["createTextVNode"])(" 52 Week High ")],-1),qe={class:"list-group-item d-flex w-100 justify-content-between"},He=Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:"bi bi-arrow-down-circle me-2"}),Object(a["createTextVNode"])(" 52 Week Low ")],-1),We={class:"list-group-item d-flex w-100 justify-content-between"},Ke=Object(a["createTextVNode"])(" 5 Year Annualized "),Ue={class:"list-group-item d-flex w-100 justify-content-between"},Je=Object(a["createTextVNode"])(" 10 Year Annualized "),Qe={class:"list-group-item d-flex w-100 justify-content-between"},Xe=Object(a["createTextVNode"])(" Total Annualized ");function Ze(e,t,s,n,c,r){return Object(a["openBlock"])(),Object(a["createBlock"])("ul",_e,[Object(a["createVNode"])("li",Le,[$e,Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(r.stockVolume),1)]),Object(a["createVNode"])("li",Ge,[ze,Object(a["createVNode"])("span",null,"$"+Object(a["toDisplayString"])(r.high52Week),1)]),Object(a["createVNode"])("li",qe,[He,Object(a["createVNode"])("span",null,"$"+Object(a["toDisplayString"])(r.low52Week),1)]),Object(a["createVNode"])("li",We,[Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:[r.getAnnualizedRate(5)>=0?c.upGraph:c.downGraph,"flex-shrink-0","me-2"]},null,2),Ke]),Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(r.getAnnualizedRate(5))+"%",1)]),Object(a["createVNode"])("li",Ue,[Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:[r.getAnnualizedRate(10)>=0?c.upGraph:c.downGraph,"me-2"]},null,2),Je]),Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(r.getAnnualizedRate(10))+"%",1)]),Object(a["createVNode"])("li",Qe,[Object(a["createVNode"])("span",null,[Object(a["createVNode"])("i",{class:[r.getAnnualizedRate()>=0?c.upGraph:c.downGraph,"me-2"]},null,2),Xe]),Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(r.getAnnualizedRate())+"%",1)])])}var et=253,tt={name:"stock-stats-display",props:{dailyPrices:{type:Array,required:!0}},data:function(){return{upGraph:"bi bi-graph-up",downGraph:"bi bi-graph-down"}},computed:{pastYearPrices:function(){return this.dailyPrices.slice(-et)},high52Week:function(){if(0===this.pastYearPrices.length)return 0;var e=Math.max.apply(Math,this.pastYearPrices.map((function(e){return e.close})));return e.toFixed(2)},low52Week:function(){if(0===this.pastYearPrices.length)return 0;var e=Math.min.apply(Math,this.pastYearPrices.map((function(e){return e.close})));return e.toFixed(2)},stockVolume:function(){return 0===this.dailyPrices.length?0:parseInt(this.dailyPrices.slice(-1)[0].volume).toLocaleString()}},methods:{getAnnualizedRate:function(e){if(0===this.dailyPrices.length)return 0;var t,s=this.dailyPrices.slice(-1)[0].close;if(void 0===e){var n=new Date(this.dailyPrices[0].date).getFullYear(),a=new Date(this.dailyPrices.slice(-1)[0].date).getFullYear();e=a-n,t=this.dailyPrices[0].open}else t=this.dailyPrices.slice(-et*e)[0].open;var c=s/t,r=100*(Math.pow(c,1/e)-1);return r.toFixed(2)}}};tt.render=Ze;var st=tt,nt=Object(a["defineAsyncComponent"])((function(){return s.e("stock-news-carousel").then(s.bind(null,"cad4"))})),at={name:"App",components:{StocksList:Se,StockSearch:oe,StockNewsCarousel:nt,StockPerformanceDisplay:Ee,StockStatsDisplay:st,StockLineCandle:q},data:function(){return{portfolioId:"60fb9d7a50c8612b1fc884a0",apiKey:"1V4VMMH8KUPV4I15",loading:!0,stocks:[],selectedStockIndex:0,showStats:!1,transactionComplete:!1,donutChartOptions:{title:{text:"Holdings Summary",align:"Center"},labels:[],legend:!1,tooltip:{y:{formatter:function(e){return"$"+e.toFixed(2)}}},plotOptions:{pie:{donut:{labels:{show:!0,total:{show:!0,showAlways:!0,label:"Total Value",formatter:function(e){return"$"+e.globals.seriesTotals.reduce((function(e,t){return e+t}),0).toFixed(2)}}}}}}}}},created:function(){var e=this;this.fetchStocks().then((function(t){e.stocks=t;var s=[];e.stocks.forEach((function(t){var n=t.symbol.split(".")[0];s.push(e.fetchIntradayPrices(n).then((function(e){t.intradayPrices=e}))),s.push(e.fetchDailyPrices(t.symbol).then((function(e){t.dailyPrices=e})))})),Promise.all(s)}))},mounted:function(){var e=this;setTimeout((function(){return e.loading=!1}),5e3)},watch:{selectedStockIndex:function(e){var t=this,s=[];if(0===this.selectedIntradayPrices.length){var n=this.selectedSymbol.split(".")[0];s.push(this.fetchIntradayPrices(n).then((function(s){return t.stocks[e].intradayPrices=s})))}0===this.selectedDailyPrices.length&&s.push(this.fetchIntradayPrices(this.selectedSymbol).then((function(s){return t.stocks[e].dailyPrices=s}))),Promise.all(s).catch((function(e){return console.log(e)}))},transactionComplete:function(e){var t=this;!0===e&&setTimeout((function(){return t.transactionComplete=!1}),3e3)},stocks:{deep:!0,immediate:!0,handler:function(){this.donutChartOptions=Object(I["a"])(Object(I["a"])({},this.donutChartOptions),{labels:this.allSymbols})}}},computed:{selectedStock:function(){return this.stocks[this.selectedStockIndex]},selectedSymbol:function(){return 0===this.stocks.length?"":this.selectedStock.symbol},selectedIntradayPrices:function(){return 0===this.stocks.length||"undefined"===typeof this.selectedStock.intradayPrices?[]:this.selectedStock.intradayPrices},selectedDailyPrices:function(){return 0===this.stocks.length||"undefined"===typeof this.selectedStock.dailyPrices?[]:this.selectedStock.dailyPrices},mostRecentDate:function(){return 0===this.selectedIntradayPrices.length?null:new Date(this.selectedIntradayPrices.slice(-1)[0].datetime)},allSymbols:function(){return this.stocks.map((function(e){return e.symbol}))},allStockShares:function(){var e=this.stocks.map((function(e){return e.shares?e.shares:0}));return e},allStockHoldings:function(){var e=this.stocks.map((function(e){if("undefined"===typeof e.intradayPrices||0===e.intradayPrices.length)return 0;var t=e.intradayPrices.slice(-1)[0].close;return e.shares*t}));return e}},methods:{fetchStocks:function(){var e=this;return Object(M["a"])(regeneratorRuntime.mark((function t(){var s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch("api/portfolios/".concat(e.portfolioId)).then((function(e){return e.json()})).catch((function(e){throw e}));case 2:return s=t.sent,n=s.data.portfolio.stocks,t.abrupt("return",n.map((function(e){return{symbol:e.symbol,shares:e.shares,transactions:e.transactions}})));case 5:case"end":return t.stop()}}),t)})))()},fetchIntradayPrices:function(e){var t=this;return Object(M["a"])(regeneratorRuntime.mark((function s(){var n,a,c;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=".concat(e,"&interval=5min&apikey=").concat("IBM"===e?"demo":t.apiKey)).then((function(e){return e.json()})).catch((function(e){throw e}));case 2:for(c in n=s.sent,a=[],n["Time Series (5min)"])a.push({datetime:new Date(c.replace(/-/g,"/")).getTime(),open:n["Time Series (5min)"][c]["1. open"],high:n["Time Series (5min)"][c]["2. high"],low:n["Time Series (5min)"][c]["3. low"],close:n["Time Series (5min)"][c]["4. close"],volume:n["Time Series (5min)"][c]["5. volume"]});return a=a.sort((function(e,t){return e.datetime-t.datetime})),s.abrupt("return",a);case 7:case"end":return s.stop()}}),s)})))()},fetchDailyPrices:function(e){var t=this;return Object(M["a"])(regeneratorRuntime.mark((function s(){var n,a,c;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".concat(e,"&outputsize=full&apikey=").concat("IBM"===e||"TSCO.LON"===e||"SHOP.TRT"===e?"demo":t.apiKey)).then((function(e){return e.json()})).catch((function(e){throw e}));case 2:for(c in n=s.sent,a=[],n["Time Series (Daily)"])a.push({date:new Date(c.replace(/-/g,"/")).getTime(),open:n["Time Series (Daily)"][c]["1. open"],high:n["Time Series (Daily)"][c]["2. high"],low:n["Time Series (Daily)"][c]["3. low"],close:n["Time Series (Daily)"][c]["4. close"],volume:n["Time Series (Daily)"][c]["5. volume"]});return a=a.sort((function(e,t){return e.date-t.date})),s.abrupt("return",a);case 7:case"end":return s.stop()}}),s)})))()},addShares:function(e,t){var s,n,a=this,c=this.stocks.find((function(t){return t.symbol===e}));if(c)return this.stocks=this.stocks.map((function(e){return e!=c?e:Object(I["a"])(Object(I["a"])({},e),{shares:e.shares+parseFloat(t),transactions:[].concat(Object(B["a"])(e.transactions),[{datetime:new Date,price:e.intradayPrices.slice(-1)[0].close,shares:parseFloat(t)}])})})),void(this.transactionComplete=!0);var r=e.split(".")[0],o=[this.fetchIntradayPrices(r).then((function(e){return s=e})),this.fetchDailyPrices(e).then((function(e){return n=e}))];Promise.all(o).then((function(){a.stocks.push({symbol:e,shares:parseFloat(t),transactions:[{datetime:new Date,price:s.length>0?s.slice(-1)[0].close:0,shares:parseFloat(t)}],intradayPrices:s,dailyPrices:n}),a.transactionComplete=!0}))},removeShares:function(e,t){var s=this.stocks.find((function(t){return t.symbol===e}));void 0!==s&&(this.stocks=this.stocks.map((function(e){return e!=s?e:Object(I["a"])(Object(I["a"])({},e),{shares:e.shares-parseFloat(t),transactions:[].concat(Object(B["a"])(e.transactions),[{datetime:new Date,price:e.intradayPrices.slice(-1)[0].close,shares:-parseFloat(t)}])})})),this.transactionComplete=!0)}}};s("9103"),s("5ba7");at.render=C,at.__scopeId="data-v-7f0d58c9";var ct=at,rt=s("ae27"),ot=s.n(rt);Object(n["a"])(ct).use(ot.a).mount("#app")},"5ba7":function(e,t,s){"use strict";s("d361")},9103:function(e,t,s){"use strict";s("12f5")},d361:function(e,t,s){},f44b:function(e,t,s){"use strict";s("5682")}});
//# sourceMappingURL=app.9bfb9b6a.js.map