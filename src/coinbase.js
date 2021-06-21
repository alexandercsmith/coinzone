/**
 * @module coinbase
 * @desc   coinbase pro api rest http interface class module
 */
const axios     = require('axios');
const crypto    = require('crypto');
const websocket = require('ws');


/**
 * @class @export { Coinbase }
 */
module.exports = class Coinbase {
  /**
   * @static @interface Granularity
   * @type    { Object }
   */
  static Granularity = {
    "1m":  60,     /*  1 minute */
    "5m":  300,    /*  5 minute */
    "15m": 900,    /* 15 minute */
    "1h":  3600,   /*  1 hour   */
    "6h":  21600,  /*  6 hour   */
    "1d":  86400   /*  1 day    */
  }


  /**
   * @static
   * @name   OrderParam
   * @type { Object }
   */
  static OrderParam = {
    stop: [
      "entry", 
      "loss"
    ],
    time_in_force: [
      "GTC",  /* good till canceled */
      "GTT",  /* good till time */
      "IOC",  /* immediate or cancel */
      "FOK"   /* fill or kill */
    ],
    type: [
      "limit", 
      "market"
    ]
  }


  /**
   * @static @function Websocket
   * @return { WebSocket }
   */
  static Websocket = () => new websocket("wss://ws-feed.pro.coinbase.com");
  /**
   * @constructor
   * @param { Object } initializers key phrase secret sandbox
   */
  constructor ({ key, phrase, secret, sandbox=true }) {
    /* @debug */
    if (process.env.NODE_ENV === 'development') {
      console.log('>', 'initializing coinbase interface:', sandbox ? 'sandbox' : 'production');
    }
    /**
     * @prop { Object } api
     */
    this.api = axios.create({
      baseURL: sandbox 
        ? "https://api-public.sandbox.pro.coinbase.com" 
        : "https://api.pro.coinbase.com",
      headers: {
        'CB-ACCESS-KEY':        key,
        'CB-ACCESS-PASSPHRASE': phrase
      }
    });
    /**
     * @instance
     */
    this.api.interceptors.request.use(function (config) {
      /**
       * @param { Number } timestamp
       */
      const timestamp = Date.now() / 1000;
      
      /**
       * @param { String } signature
       */
      const signature = crypto.createHmac('sha256', 
        Buffer.from(secret, 'base64'))
      .update([
        timestamp, 
        config.method.toUpperCase(), 
        config.url, 
        (!!config.data 
          ? JSON.stringify(config.data) 
          : '')
      ].join(''))
      .digest('base64');

      /**
       * @prop { Object } headers
       */
      config.headers['CB-ACCESS-TIMESTAMP'] = timestamp;
      config.headers['CB-ACCESS-SIGN']      = signature;

      /**
       * @return 
       */
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
  }


  /**
  * @async @function get
  * @param  { String } url 
  * @param  { Object } params {}
  * @return { Array | Object } 
  */
  async get (url, params={}) {
    try {
      return await this.api.get( 
        this._toQueryURL(url, params)).then(res => res.data);
    } catch (e) {
      console.error('coinbase: get', url, e.message);
      throw new Error(e);
    }
  }


  /* --- [getters] --- */


  /**
   * @async @function accounts
   * @param  { String } id null
   * @return { Array | Object }
   */
  accounts = async (id=null) => 
    await this.get('/accounts' + (!!id ? "/".concat(id) : ''));
  /* =>
  [
    {
      "id": "71452118-efc7-4cc4-8780-a5e22d4baa53",
      "currency": "BTC",
      "balance": "0.0000000000000000",
      "available": "0.0000000000000000",
      "hold": "0.0000000000000000",
      "profile_id": "75da88c5-05bf-4f54-bc85-5c775bd68254",
      "trading_enabled": true
    },
    {
      "id": "e316cb9a-0808-4fd7-8914-97829c1925de",
      "currency": "USD",
      "balance": "80.2301373066930000",
      "available": "79.2266348066930000",
      "hold": "1.0035025000000000",
      "profile_id": "75da88c5-05bf-4f54-bc85-5c775bd68254",
      "trading_enabled": true
    }
  ]
  */


  /**
   * @async @function currencies
   * @return { Array }
   */
  currencies = async (id=null) => 
    await this.get('/currencies' + (!!id ? "/".concat(id) : ''));
  /* =>
  [
    {
      "id": "BTC",
      "name": "Bitcoin",
      "min_size": "0.00000001",
      "status": "online",
      "max_precision": "0.01",
      "message": "",
      "details": {
        "type": "crypto",
        "symbol": "₿",
        "network_confirmations": 3,
        "sort_order": 3,
        "crypto_address_link": "https://live.blockcypher.com/btc/address/{{address}}",
        "crypto_transaction_link": "https://live.blockcypher.com/btc/tx/{{txId}}",
        "push_payment_methods": [
          "crypto"
        ],
        "group_types": [
          "btc",
          "crypto"
        ],
      }
    }
  ]
  */


  /**
   * @async @function fees
   * @returns { Object }
   */
  fees = async () => await this.get('/fees');
  /* =>
  [
    {
      "maker_fee_rate": "0.0015",
      "taker_fee_rate": "0.0025",
      "usd_volume": "25000.00"
    }
  ]
  */


  /**
   * @async @function fills
   * @returns { Array | Object }
   */
  fills = async (params={}) => await this.get('/fills', params);
  /* =>
  [
    {
      "trade_id": 74,
      "product_id": "BTC-USD",
      "price": "10.00",
      "size": "0.01",
      "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",
      "created_at": "2014-11-07T22:19:28.578544Z",
      "liquidity": "T",
      "fee": "0.00025",
      "settled": true,
      "side": "buy"
    }
  ]
  */


  /**
   * @async @function history 
   * @param  { String } id   
   * @return { Array }
   */
  history = async (id) => await this.get(`/accounts/${id}/ledger`);
  /* =>
  [
    {
      "id": "100",
      "created_at": "2014-11-07T08:19:27.028459Z",
      "amount": "0.001",
      "balance": "239.669",
      "type": "fee",
      "details": {
        "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",
        "trade_id": "74",
        "product_id": "BTC-USD"
      }
    }
  ]
  */


  /**
   * @async @function holds 
   * @param  { String } id   
   * @return { Array }
   */
  holds = async (id) => await this.get(`/accounts/${id}/holds`);
  /* =>
  [
    {
      "id": "82dcd140-c3c7-4507-8de4-2c529cd1a28f",
      "account_id": "e0b3f39a-183d-453e-b754-0c13e5bab0b3",
      "created_at": "2014-11-06T10:34:47.123456Z",
      "updated_at": "2014-11-06T10:40:47.123456Z",
      "amount": "4.23",
      "type": "order",
      "ref": "0a205de4-dd35-4370-a285-fe8fc375a273",
    }
  ]
  */

  
  /**
   * @async @function limits
   * @returns { Array | Object }
   */
  limits = async () => await this.get('/users/self/exchange-limits');
  

  /**
   * @async @function orders
   * @param  { String } id null
   * @return { Array | Object }
   */
  orders = async (id=null, params={}) => 
    await this.get('/orders' + (!!id ? "/".concat(id) : ''), params);
  /* =>
  {
    "id": "68e6a28f-ae28-4788-8d4f-5ab4e5e5ae08",
    "size": "1.00000000",
    "product_id": "BTC-USD",
    "side": "buy",
    "stp": "dc",
    "funds": "9.9750623400000000",
    "specified_funds": "10.0000000000000000",
    "type": "market",
    "post_only": false,
    "created_at": "2016-12-08T20:09:05.508883Z",
    "done_at": "2016-12-08T20:09:05.527Z",
    "done_reason": "filled",
    "fill_fees": "0.0249376391550000",
    "filled_size": "0.01291771",
    "executed_value": "9.9750556620000000",
    "status": "done",
    "settled": true
  }
  */


  /**
   * @async @function products
   * @param  { String } id null
   * @return { Array | Object }
   */
  products = async (id=null, params={}, filter=null) => 
    await this.get('/products' + 
      (!!id ? "/".concat(id) : '') + 
      (!!filter ? "/".concat(filter) : ''), 
      params);
  /* =>
  [
    {
      "id": "BTC-USD",
      "display_name": "BTC/USD",
      "base_currency": "BTC",
      "quote_currency": "USD",
      "base_increment": "0.00000001",
      "quote_increment": "0.01000000",
      "base_min_size": "0.00100000",
      "base_max_size": "280.00000000",
      "min_market_funds": "5",
      "max_market_funds": "1000000",
      "status": "online",
      "status_message": "",
      "cancel_only": false,
      "limit_only": false,
      "post_only": false,
      "trading_disabled": false
    }
  ]
   *
   * => /book
  {
    "sequence": "3",
    "bids": [
      [ price, size, num-orders ],
    ],
    "asks": [
      [ price, size, num-orders ],
    ]
  }
   *
   * => /book?level=2
  {
    "sequence": "3",
    "bids": [
      [ price, size, num-orders ],
      [ "295.96", "4.39088265", 2 ],
    ],
    "asks": [
      [ price, size, num-orders ],
      [ "295.97", "25.23542881", 12 ],
    ]
  }
   *
   * => /book?level=3
  {
    "sequence": "3",
    "bids": [
      [ price, size, order_id ],
      [ "295.96","0.05088265","3b0f1225-7f84-490b-a29f-0faef9de823a" ],
    ],
    "asks": [
      [ price, size, order_id ],
      [ "295.97","5.72036512","da863862-25f4-4868-ac41-005d11ab0a5f" ],
    ]
  }
   *
   * => /candles
  [
    [ time, low, high, open, close, volume ],
    [ 1415398768, 0.32, 4.2, 0.35, 4.2, 12.3 ],
  ]
   *
   * => /stats
  {
    "open": "6745.61000000", 
    "high": "7292.11000000", 
    "low": "6650.00000000", 
    "volume": "26185.51325269", 
    "last": "6813.19000000", 
    "volume_30day": "1019451.11188405"
  }
   *
   * => /ticker
  {
    "trade_id": 4729088,
    "price": "333.99",
    "size": "0.193",
    "bid": "333.98",
    "ask": "333.99",
    "volume": "5957.11914015",
    "time": "2015-11-14T20:46:03.511254Z"
  }
   *
   * => /trades
  [{
    "time": "2014-11-07T22:19:28.578544Z",
    "trade_id": 74,
    "price": "10.00000000",
    "size": "0.01000000",
    "side": "buy"
  }, {
    "time": "2014-11-07T01:08:43.642366Z",
    "trade_id": 73,
    "price": "100.00000000",
    "size": "0.01000000",
    "side": "sell"
  }]
  */

  
  /**
   * @async @function profiles
   * @param  { String } id null
   * @return { Array | Object }
   */
  profiles = async (id=null, params={ active: true }) => 
    await this.get('/profiles' + (!!id ? "/".concat(id) : ''), params);
  /* =>
  [
    {
      "id": "86602c68-306a-4500-ac73-4ce56a91d83c",
      "user_id": "5844eceecf7e803e259d0365",
      "name": "default",
      "active": true,
      "is_default": true,
      "created_at": "2019-11-18T15:08:40.236309Z"
    }
  ]
  */


  /**
   * @async @function time 
   * @return { Object }
   */
  time = async () => await this.get('/time');
  /* =>
  {
    "iso": "2015-01-07T23:47:25.201Z",
    "epoch": 1420674445.201
  }
  */


  /**
   * @async @function transfers
   * @returns { Array | Object }
   */
  transfers = async (params={}) => await this.get('/transfers', params);


  /* --- [orders] --- */


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


  /* --- [helpers] --- */


  /**
   * @function _toQueryURL
   * @param  { String } url 
   * @param  { Object } params {}
   * @return { String }
   */
  _toQueryURL (url, params={}) {
    url = url.startsWith("/") ? url : "/".concat(url);
    if (Object.entries(params).length > 0) { 
      url = [url, new URLSearchParams(params).toString()].join('?'); 
    }
    return url;
  }
}