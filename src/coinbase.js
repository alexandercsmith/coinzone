/**
 * @module coinbase
 * @desc   coinbase pro api interface class module
 */
const axios     = require('axios');
const crypto    = require('crypto');
const websocket = require('ws');

/*
 Coinbase {
   static WS:          WebSocket
   static Granularity: { ... }

   #config: { ... }
   #sign (url, method, data)

   async get  (url, params)
   async buy  (order)
   async sell (order)
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
      ? this.#config.api.production 
      : this.#config.api.sandbox);

    /**
     * @prop { String } secret 
     */
    this.secret = production 
      ? this.#config.secret.production 
      : this.#config.secret.sandbox;
  }


  /**
  * @private 
  * @constant config
  */
  #config = {
    api: {
      production: {
        baseURL: "https://api.pro.coinbase.com",
        headers: {
          'CB-ACCESS-KEY': process.env.COINBASE_PRODUCTION_KEY,
          'CB-ACCESS-PASSPHRASE': process.env.COINBASE_PRODUCTION_PHRASE
        }
      },
      sandbox: {
        baseURL: "https://api-public.sandbox.pro.coinbase.com",
        headers: {
          'CB-ACCESS-KEY': process.env.COINBASE_SANDBOX_KEY,
          'CB-ACCESS-PASSPHRASE': process.env.COINBASE_SANDBOX_PHRASE
        }
      }
    },
    secret: {
      production: process.env.COINBASE_PRODUCTION_SECRET,
      sandbox: process.env.COINBASE_SANDBOX_SECRET
    }
  }


  /**
  * @private
  * @function #sign
  * @param  { string } payload 
  * @return { object }
  */
  #sign (url, method="get", data={}) {
    const timestamp = Date.now() / 1000;
    const initial   = timestamp + method.toUpperCase() + url;
    const payload   = Object.entries(data).length > 0 ? initial+JSON.stringify(data) : initial;
    const secret    = Buffer.from(this.secret, 'base64');
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64');
    return { 
      'CB-ACCESS-TIMESTAMP': timestamp, 
      'CB-ACCESS-SIGN': signature 
    }
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
      // @url
      if (!url.startsWith('/')) { 
        url = "/".concat(url); 
      }
      // @params
      if (Object.entries(params).length > 0) { 
        url = [url, new URLSearchParams(params).toString()].join('?'); 
      }
      // @request
      return await this.api.request({ 
        url, 
        headers: this.#sign(url) 
      }).then(res => res.data);
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