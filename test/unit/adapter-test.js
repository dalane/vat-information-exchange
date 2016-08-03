"use strict";

const chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-as-promised'));

const adapterFactory = require('../../lib');

const validArgs = {
    countryCode: 'GB',
    vatNumber: '166761480',
    name: 'DALANE CONSULTING LTD',
    address: '...'
};

const invalidArgs = {
    countryCode: 'GB',
    vatNumber: '16676148x'
};

class soapClientMock {
    checkVat(args, callback) {
        return process.nextTick(() => {
            if (args.countryCode === validArgs.countryCode && args.vatNumber === validArgs.vatNumber) {
                callback(null, {
                    countryCode: validArgs.countryCode,
                    vatNumber: validArgs.vatNumber,
                    requestDate: '2014-10-14+02:00',
                    valid: true,
                    name: validArgs.name,
                    address: validArgs.address
                });
            } else {
                callback(null, {
                    countryCode: null,
                    vatNumber: null,
                    requestDate: '2014-10-14+02:00',
                    valid: false,
                    name: null,
                    address: null
                });
            }
        });
    }
}

class soapMock {
    createClient(url, callback) {
        process.nextTick(() => {
            callback(null, new soapClientMock());
        });
    }
}

describe('Vat Information Exchange Adapter', () => {
    it('should return a valid vat record', function () {
        var adapter = adapterFactory.getAdapter(new soapMock());
        return adapter.getVatRegistrationDetails(validArgs.countryCode, validArgs.vatNumber).then(result => {
            expect(result.countryCode).to.equal(validArgs.countryCode);
            expect(result.name).to.equal(validArgs.name);
            expect(result.address).to.equal(validArgs.address);
        });
    });
    it('should return an InvalidVatDetailsError', function () {
        var adapter = adapterFactory.getAdapter(new soapMock());
        adapter.getVatRegistrationDetails(invalidArgs.countryCode, invalidArgs.vatNumber).should.be.rejectedWith(adapter.errors.InvalidVatDetailsError);
    });
});
