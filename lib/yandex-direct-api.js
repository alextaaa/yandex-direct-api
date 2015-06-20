var request = require('request'),
    utils = require('./utils');

// Yandex Direct API domain.
const API = 'https://api.direct.yandex.ru/';
// Sandbox Yandex Direct API url.
const SANDBOX_API = 'https://api-sandbox.direct.yandex.ru/';
// Default configuration.
const DEFAULT_CONF = {
    version: 4,
    live: false,
    sandbox: false,
    locale: 'en'
};

/**
 * Yandex Direct API wrapper.
 * @param options object with auth token, API version and locale.
 * @constructor
 */
function YandexDirectApi (options) {
    if (!(this instanceof YandexDirectApi)) {
        return new YandexDirectApi(options);
    }
    options = utils.deepMerge(options || {}, DEFAULT_CONF);

    this.url = this.__constructUrl(options);
    this.token = options.token;
    this.options = options;
    this.locale = options.locale;
    return this;
}

/**
 * Call method for the Yandex API.
 * @param method Yandex Direct API method.
 * @param params (optional) params if required.
 * @param cb callback function
 */
YandexDirectApi.prototype.call = function (method, params, cb) {
    if (typeof params == "function") {
        cb = params;
        params = {};
    }
    if (typeof cb != "function") {
        throw Error('callback is not a function');
    }
    request({
        method: 'post',
        json: true,
        uri: this.url,
        body: {
            method: method,
            token: this.token,
            param: params
        }
    }, this._callback(cb));
};

YandexDirectApi.prototype.__constructUrl = function (options) {
    var url;
    
    if (options.url) {
        url = options.url;
    } else {
        url = options.sandbox ? SANDBOX_API : API;
        if (options.live) url += 'live/';
        url += 'v' + options.version + '/json/';
    }

    return url;
};

YandexDirectApi.prototype._callback = function (cb) {
    return function (e, r, body) {
        if (!e && r.statusCode == 200 && body) {
            if (body.data) {
                cb(null, body.data);
            } else {
                cb({
                    code: body.error_code,
                    message: body.error_str,
                    detail: body.error_detail
                });
            }
            return;
        }
        cb({error: e, response: r});
    }
};

exports = module.exports = YandexDirectApi;