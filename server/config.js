"use strict";

module.exports = {
    staticFolder: __dirname+ '/../client/dist/',
    secret : 'thisisasecret',
    mongoUrl : 'mongodb://192.168.1.192/mongoose',
    defaultCustody : {
      name: "My Custody"
    },
    defaultCashAccount : {
    	name : "My DKK cash account",
    	currency : "DKK",
    	balance : "100000"
    }
};