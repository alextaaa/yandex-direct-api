# Yandex Direct API wrapper

[![yandex-direct-api](https://nodei.co/npm/yandex-direct-api.png?stars&downloads)](https://nodei.co/npm/yandex-direct-api/)

[More info en](https://tech.yandex.com/direct/)

[More info ru](https://tech.yandex.ru/direct/)

***

[![Donate](https://img.shields.io/badge/Donate-YandexMoney-green.svg)](https://money.yandex.ru/to/410011926075651)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

If you found this package useful, please star it.

Also you may like to Tweet about it or share at Facebook.

#### Usage

```
token: '8NsFV5UwJ5tnxA9hLcOYfFNNoFfOSQOl', // required.
locale: 'en', // optional; default is 'en'.
live: false, // optional; default is false.
sandbox: false, // optional; default is false.
version: 4, // optional; default is 4.
url: 'https://' optional; your custom url.
```

ecmascript style

```javascript
const YandexDirectApi = require('yandex-direct-api');

// API
let api = YandexDirectApi({
	token: '8NsFV5UwJ5tnxA9hLcOYfFNNoFfOSQOl'
});

// Request without params
api.call('GetVersion', (err, data) => {
	console.log(err, data);
});

// Request with params
api.call('GetCampaignParams', {CampaignID: 06892638}, (err, data) => {
	console.log(err, data);
});
```
