"use strict";

class InvalidVatDetailsError extends Error {
    constructor(message) {
        super(message);
        this.type = 'InvalidVatDetailsError';
    }
}

module.exports = {
    InvalidVatDetailsError: InvalidVatDetailsError
};
