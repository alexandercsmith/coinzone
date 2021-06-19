/**
 * @module client 
 */
const axios = require('axios');
const crypto = require('crypto');

/**
 * @exports
 */
module.exports = function (production=false) {
  // { axios }
  const api = axios.create(production 
    ? {
      baseURL: "https://api.pro.coinbase.com",
      headers: {
        'CB-ACCESS-KEY': process.env.COINBASE_PRODUCTION_KEY,
        'CB-ACCESS-PASSPHRASE': process.env.COINBASE_PRODUCTION_PHRASE
      }
    } 
    : {
      baseURL: "https://api-public.sandbox.pro.coinbase.com",
      headers: {
        'CB-ACCESS-KEY': process.env.COINBASE_SANDBOX_KEY,
        'CB-ACCESS-PASSPHRASE': process.env.COINBASE_SANDBOX_PHRASE
      }
    });
  
  // interceptor[request]
  api.interceptors.request.use(function (config) {
    // headers['CB-ACCESS-TIMESTAMP']
    const timestamp = Date.now() / 1000;
    
    // headers['CB-ACCESS-SIGN']
    const signature = crypto.createHmac('sha256', 
      Buffer.from(production 
      ? process.env.COINBASE_PRODUCTION_SECRET 
      : process.env.COINBASE_SANDBOX_SECRET, 
      'base64'))
    .update([
        timestamp, 
        config.method.toUpperCase(), 
        config.url, 
        (!!config.data ? JSON.stringify(config.data) : '')
      ].join(''))
    .digest('base64');

    // config[headers]
    config.headers['CB-ACCESS-TIMESTAMP'] = timestamp;
    config.headers['CB-ACCESS-SIGN']      = signature;

    // return { config }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // return { api }
  return api;
}