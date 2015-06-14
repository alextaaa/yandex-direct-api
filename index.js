module.exports = process.env.YANDEX_DIRECT_API_COV
    ? require('./lib-cov/yandex-direct-api')
    : require('./lib/yandex-direct-api');