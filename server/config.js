"use strict";

module.exports = {
    mongo: {
        dbUrl: 'mongodb://192.168.1.192:27017/smoke'
    },
    server: {
        staticFolder: __dirname+ '/../client'
    }
};