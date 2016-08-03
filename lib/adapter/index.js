"use strict";

const errors = require('../errors');

class adapter {
    constructor(soap, config) {
        this._url = config.url;
        this._soap = soap;
    }
    get errors() {
        return errors;
    }
    getSoapClient(forceReload) {
        var self = this;
        forceReload = forceReload || false;
        if (!self._soapClient || forceReload) {
            self._soapClient = new Promise((resolve, reject) => {
                self._soap.createClient(self._url, (error, client) => {
                    if (!error) {
                        resolve(client);
                    } else {
                        reject(error);
                    }
                });
            });
        }
        return self._soapClient;
    }
    getVatRegistrationDetails(countryCode, vatNumber) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.getSoapClient().then(client => {
                var args = {
                    countryCode: countryCode,
                    vatNumber: vatNumber
                };
                client.checkVat(args, (error, result) => {
                    /*
                        This is the result:
                        {
                            countryCode: 'xx',
                            vatNumber: '11111111',
                            requestDate: '2014-10-14+02:00',
                            valid: '1',
                            name: 'ENTITY NAME',
                            address: 'ENTITY ADDRESS'
                        }
                     */
                    if (!error) {
                        if (result.valid) {
                           resolve({
                               countryCode: result.countryCode,
                               countryName: '',
                               vatNumber: result.vatNumber,
                               requestDate: result.requestDate,
                               name: result.name,
                               address: result.address
                           });
                       } else {
                           reject(new self.errors.InvalidVatDetailsError('The VAT details provided are not recognised'));
                       }
                   } else {
                       reject(error);
                   }
               });
           }).catch(error => {
               reject(error);
           });
       });
   }
}

module.exports = adapter;
