# Currency Converter

## Installation


```bash
npm install
```

## Usage

```bash
npm start
```

## Description
Currency Converter uses [exchangeratesapi](https://exchangeratesapi.io/) to get the current and historical rate. The application implements saving the application state after page reload. The request to get the exchange rate will not be sent when loading the page if it has already been sent today.
Also, the application implements the receipt of the historical rate for a certain period of time. If once the rate has already been obtained for a certain period, the next time it will be taken from memory.

## License
[MIT](https://choosealicense.com/licenses/mit/)