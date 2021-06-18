/**
 * @module coinbase
 * @desc   coinbase pro api interface class module
 */
const axios     = require('axios');
const crypto    = require('crypto');
const websocket = require('ws');

/*
 Coinbase {
   static Granularity: { ... }
   static WS:          WebSocket

   async get  (url, params) => []|{}
   async buy  (order) => {}
   async sell (order) => {}
 } 
 */

/**
 * @class 
 * @export { Coinbase }
 */
module.exports = class Coinbase {
  /**
   * @static
   * @interface Granularity
   * @type    { Object }
   */
  static Granularity = {
    "1m":  60,     /*  1 (minute) */
    "5m":  300,    /*  5 (minute) */
    "15m": 900,    /* 15 (minute) */
    "1h":  3600,   /*  1 (hour)   */
    "6h":  21600,  /*  6 (hour)   */
    "1d":  86400   /*  1 (day)    */
  }

  
  /**
   * @static 
   * @interface WS
   * @type    { WebSocket }
   */
  static WS = () => new websocket('wss://ws-feed.pro.coinbase.com');


  /**
   * @constructor
   * @param { Boolean } production false
   */
  constructor (production=false) {
    /**
     * @prop { Object } api
     */
    this.api = axios.create(production 
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
    
    this.api.interceptors.request.use(function (config) {
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
  }


  /**
  * @async 
  * @function get
  * @param  { String } url 
  * @param  { Object } params {}
  * @return { Array | Object } 
  */
  async get (url, params={}) {
    try {
      url = url.startsWith("/") ? url : "/".concat(url);
      if (Object.entries(params).length > 0) { 
        url = [url, new URLSearchParams(params).toString()].join('?'); 
      }
      return await this.api.get(url).then(res => res.data);
    } catch (e) {
      console.error('coinbase: get', url, e.message);
      throw new Error(e);
    }
  };


  /**
  * @async
  * @function buy
  * @param  { Object } order {}
  * @return { Object }
  */
  async buy (order={}) {
    try {
      return;
    } catch (e) {
      console.error('coinbase: buy', e.message);
      throw new Error(e);
    }
  }


  /**
  * @async
  * @function sell
  * @param  { Object } order {}
  * @return { Object }
  */
  async sell (order={}) {
    try {
      return;
    } catch (e) {
      console.error('coinbase: sell', e.message);
      throw new Error(e);
    }
  }
}