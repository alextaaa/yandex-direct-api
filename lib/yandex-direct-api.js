const request = require('request');

// Yandex Direct API domain.
const API = 'https://api.direct.yandex.com/';
// Sandbox Yandex Direct API url.
const SANDBOX_API = 'https://api-sandbox.direct.yandex.com/';
// Default configuration.
const DEFAULT_CONF = {
	version: 4,
	live: false,
	sandbox: false,
	locale: 'en'
};

let YandexDirectApi = function(options = {}) {
	if (!(this instanceof YandexDirectApi))
		return new YandexDirectApi(options);

	options = Object.assign(DEFAULT_CONF, options);

	this.url = this.__constructUrl(options);
	this.token = options.token;
	this.options = options;
	this.locale = options.locale;

	return this;
};

YandexDirectApi.prototype.call = function(method, params, cb) {
	let reqobj = {
		method: 'post',
		json: true,
		uri: this.url,
		body: {
			method: method,
			token: this.token,
			param: params
		}
	};

	if (typeof cb !== "function")
		cb = (err, data) => {
			console.log(err, data);
		}
	if (typeof params === 'function') {
		cb = params;
		params = {};
	}

	request(reqobj, (error, response, body) => {
		if (!error && response.statusCode === 200 && body) {
			if (body.data)
				cb(null, body.data);
			else
				cb(null, {
					code: body.error_code,
					message: body.error_str,
					detail: body.error_detail
				});
			return;
		}
		cb({error, response}, null);
	});
};

YandexDirectApi.prototype.__constructUrl = (options = {}) => {
	let url = options.sandbox ? SANDBOX_API : API;
	if (options.live) url += 'live/';
	if (options.version) url += `v${options.version}/json/`;
	if (options.url) url = options.url;
	return url;
};

exports = module.exports = YandexDirectApi;
