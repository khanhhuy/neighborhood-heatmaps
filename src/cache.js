const fs = require('fs');
const moment = require('moment');
const Promise = require('q').Promise;
const _ = require('lodash');

const BASE_DIR = `${__dirname}/../cache_data`;
const SEPARATOR = '##';
const DATE_FORMAT = 'DD-MM-YY-HH-mm-ss';

// Cache based on file system
// I want to write a simple Cache class instead of using the node-cache library.
class Cache {

  // Fetch the latest cache of a @keyPrefix. 
  // It loops through all cache files that mataches @keyPrefix and pick the latest one.
  //
  // @keyPrefix: the key that does not contain the date part
  // Return: { data: , createdAt: }
  //  data: cached data
  //  createdAt: moment object
  static async fetchLatest(keyPrefix) {
    const self = this;

    return new Promise((resolve, reject) => {
      fs.readdir(BASE_DIR, async (err, files) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        const keyRg = new RegExp(`${keyPrefix}${SEPARATOR}.+`);

        const matchKeys = _.filter(files, (file) => {
          const matches = file.match(keyRg);
          return !_.isEmpty(matches);
        });

        if (_.isEmpty(matchKeys)) {
          resolve(null);
        }

        const dateRg = new RegExp(`${SEPARATOR}.+$`);
        const keysWithDate = _.map(matchKeys, (key) => {
          const dateString = key.match(dateRg)[0];
          return { key: key, createdAt: moment(dateString, DATE_FORMAT) };
        })

        const latestKey = _.maxBy(keysWithDate, (key) => {
          return key.createdAt.valueOf();
        });

        try {
          const cachedData = await self.fetch(latestKey.key);
          resolve({
            data: cachedData,
            createdAt: latestKey.createdAt
          });
        } catch (err) {
          reject(err);
        }
      })
    });
  }

  // Read cache file and deserialize data
  static fetch(key) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${BASE_DIR}/${key}`, (err, buff) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        const cachedData = JSON.parse(buff.toString());
        resolve(cachedData);
      });
    })
  }

  // Automatically added created date to the key
  // E.g: munich##20-06-19-20-20-20
  static async setWithDate(key, data) {
    const datetime = moment().format(DATE_FORMAT);
    await this.set(`${key}${SEPARATOR}${datetime}`, data);
  }

  static async set(key, data) {
    const serializedData = JSON.stringify(data);

    return new Promise((resolve, reject) => {
      fs.writeFile(`${BASE_DIR}/${key}`, serializedData, { flag: 'w+' }, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve('write to file success');
      });
    });
  }

}

module.exports = {
  BASE_DIR: BASE_DIR,
  DATE_FORMAT: DATE_FORMAT,
  SEPARATOR, SEPARATOR,
  Cache: Cache
}