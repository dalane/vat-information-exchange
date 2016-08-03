"use strict";

const chai = require('chai');
const expect = chai.expect;
chai.should();
chai.use(require('chai-as-promised'));

const adapterFactory = require('../../lib');

const validArgs = {
    countryCode: 'GB',
    vatNumber: '166761480',
    name: 'DALANE CONSULTING LTD'
};

const invalidArgs = {
    countryCode: 'GB',
    vatNumber: '16676148x'
};

describe('Vat Information Exchange Adapter', () => {
    it('should return a valid vat record', function () {
        var adapter = adapterFactory.getAdapter();
        return adapter.getVatRegistrationDetails(validArgs.countryCode, validArgs.vatNumber).then(result => {
            expect(result.countryCode).to.equal(validArgs.countryCode);
            expect(result.name).to.equal(validArgs.name);
        });
    });
    it('should return an InvalidVatDetailsError', function () {
        var adapter = adapterFactory.getAdapter();
        adapter.getVatRegistrationDetails(invalidArgs.countryCode, invalidArgs.vatNumber).should.be.rejectedWith(adapter.errors.InvalidVatDetailsError);
    });
});
