Yandex Direct API wrapper 1.0.1
====================

[![NPM](https://nodei.co/npm/yandex-direct-api.png?stars&downloads)](https://nodei.co/npm/yandex-direct-api/)

Wrapper for Yandex Direct API

[More info en](https://tech.yandex.com/direct/)

[More info ru](https://tech.yandex.ru/direct/)

Use options
```
token: '8NsFV5UwJ5tnxA9hLcOYfFNNoFfOSQOl', // required.
locale: en, // optional; default is 'en'.
live: false, // optional; default is false.
sandbox: false, // optional; default is false.
version: 4 // optional; default is 4.
url: 'http://url.com' // optional; instead of 'live', 'sandbox', 'version' you can put this. Considering for tests.

```

Usage example
```
var YandexDirectApi = require('yandex-direct-api');

var api = YandexDirectApi({
    token: '8NsFV5UwJ5tnxA9hLcOYfFNNoFfOSQOl',
});

// Request without params.
api.call('GetVersion', function(err, data){
    // data do something
});

// Request with params.
api.call('GetCampaignParams', {CampaignID: 06892638}, function(err, data){
    // data is CampaignInfo
});
```