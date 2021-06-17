/**
 * @module coinbase
 * @desc   coinbase pro api interface class module
 */
const axios     = require('axios');
const crypto    = require('crypto');
const websocket = require('ws');


/**
 * @class 
 * @export { Coinbase }
 */
module.exports = class Coinbase {
  /**
   * @static @interface WS
   */
  static WS = () => new websocket('wss://ws-feed.pro.coinbase.com');


  /**
   * @constructor
   * @param { Boolean } production false
   */
  constructor (production=false) {
    this.client = axios.create(production ? this.#config.api.production : this.#config.api.sandbox);
    this.secret = production ? this.#config.secret.production : this.#config.secret.sandbox;
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
    const payload   = Object.entries(data).length > 0 ? initial + JSON.stringify(data) : initial;
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
  * @param  { String } id null 
  * @param  { Object } params {}
  * @return { Array | Object } 
  */
  async get (url, id=null, params={}) {
    try {
      url = "/".concat(!!id ? [url, id].join('/') : url);
      url = Object.entries(params).length > 0 ? url + new URLSearchParams(params).toString() : url;
      return await this.client.request({ url, headers: this.#sign(url) }).then(res => res.data);
    } catch (e) {
      console.error('coinbase: get', url, e.message);
      throw new Error(e);
    }
  };


  /**
  * @async
  * @function buy
  * @param  { Object } order
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
  * @param  { Object } order
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