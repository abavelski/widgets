var http = require('http');
var csv = require('csv');

var columns = {
    ask : "a",
    bid : "b",
    lastTradeDate: "d1",
    lastTradePrice: "l1",
    daysLow : "g",
    daysHigh: "h",
    yearLow : "j",
    yearHigh: "k",
    yearRange: "w",
    symbol : "s",
    name : "n",
    volume : "v",
    exchange : "x",
    moreInfo : "i",
    notes : "n4",
    change : "c1",
    changePercent : "p2",
    marketCap : "j1",
    priceBook : "s1",
    yearTargetPrice : "t8"
};

var StockInfo = function() {
    var self = this;
    var mySymbols = ['AAPL', 'GOOG', 'YHOO'];
    var myFields = ['symbol', 'name', 'exchange'];
    var myCallback = function(data) {
        console.log(data);
    };

    this.forSymbols = function(symbols) {
        mySymbols = symbols;
        return self;
    };

    this.withFields = function(fields) {
        myFields = fields;
        return self;
    };

    this.getStocks = function(callback) {
        var requestURL =  "http://download.finance.yahoo.com/d/quotes.csv?s="+getStockList()+"&f="+getColumns(myFields);
        if (callback) {
            myCallback = callback;
        }
        http.get(requestURL, function(res) {
            if ( res.statusCode!=200) throw new Error("Error: "+res.statusCode);
            csv().from.stream(res).to.array(function(stocksData) {
                transformResponse(stocksData);
            });
        }).on('error', function(e) {
                throw e;
            });
    };

    var getColumns = function(arr) {
        var str = "";
        for (var i =0; i<arr.length; i++) {
            str+=columns[arr[i]];
        }
        return str;
    };

    var transformResponse = function(arr) {
        var res = [];
        for (var i=0; i<arr.length;i++) {
            var obj = {}
            for (var j=0; j<myFields.length; j++) {
                obj[myFields[j]]=arr[i][j];
            }
            res.push(obj);
        }
        myCallback(res);
    };

    var getStockList = function() {
        var str = "";
        for (var i=0;i<mySymbols.length; i++) {
            str+=mySymbols[i]+"+";
        }
        return str;
    };

};

module.exports = new StockInfo();

