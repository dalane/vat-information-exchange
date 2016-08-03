"use strict";

var vatInformationExchange = function () {
    this._singleton = null;
};

vatInformationExchange.prototype.getAdapter = function (soap) {
    var config = require('./config.json');
    var Adapter = require('./adapter');
    // if a soap client hasn't been provided then we'll use the npm library 'soap'
    soap = soap || require('soap');
    if (this._singleton === null) {
        this._singleton = new Adapter(soap, config);
    }
    return this._singleton;
};

module.exports = new vatInformationExchange();
