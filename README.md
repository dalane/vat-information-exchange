# VAT Information Exchange Adapter
A node.js adapter to retrieve company VAT information from the European Union VAT Information Exchange

## Usage

```javascript
const vieAdapterFactory = require('@dalane/vat-information-exchange');
const vieAdapter = vieAdapterFactory.getAdapter();

var countryCode = 'GB';
var vatNumber = '166761480';

// #getVatRegistrationDetails() returns a promise
adapter.getVatRegistrationDetails(countryCode, vatNumber).then(result => {
    /*
        result = {
            countryCode: '...',
            countryName: '...',
            vatNumber: '...',
            requestDate: '...',
            name: '...',
            address: '...'
        }
     */
}).catch(error => {
    /*
        adapter.errors.InvalidVatDetailsError
     */
});
```
