/* @copyright Itential, LLC 2020 */

/* eslint object-shorthand: warn */
/* eslint import/no-extraneous-dependencies: warn */
/* eslint global-require: warn */
/* eslint import/no-unresolved: warn */

const winston = require('winston');

const logLevel = 'none';
const myCustomLevels = {
  levels: {
    spam: 6,
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    none: 0
  }
};

const basicGet = {
  /**
   * @summary create Adapter instance
   *
   * @function getAdapterInstance
   * @param {Object} adapter - adaper configuration object required by IAP
   */
  getAdapterInstance: (adapter) => {
    const Adapter = require('../adapter');
    const adapterProps = JSON.parse(JSON.stringify(adapter.properties.properties));
    adapterProps.stub = false;
    // need to set global logging
    global.log = winston.createLogger({
      level: logLevel,
      levels: myCustomLevels.levels,
      transports: [
        new winston.transports.Console()
      ]
    });
    return new Adapter(
      adapter.id,
      adapterProps
    );
  },

  /**
   * @summary connect to mongodb
   *
   * @function connect
   * @param {Object} properties - pronghornProps
   */
  connect: async function connect(properties) {
    // Connect to Mongo
    const { MongoDBConnection } = require('@itential/database');
    const connection = new MongoDBConnection(properties.mongoProps);
    const database = await connection.connect(true);
    return database;
  }
};

module.exports = basicGet;
