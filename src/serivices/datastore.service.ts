const Datastore = require('@google-cloud/datastore');

import { DataStoreKeyType } from './../models'

export class DatastoreService {
  ds: any;
  datastoreKey: string;

  constructor(kind: string) {
    this.ds = Datastore({
      keyFilename: './servkey.json',
      projectId: 'food-me-api',
    });
    this.datastoreKey = kind;
  }

  async update(id, data) {
    return new Promise(resolve => {
      let key;
      if (id) {
        key = this.ds.key([this.datastoreKey, data.email]);
      } else {
        key = this.ds.key([this.datastoreKey, data.email]);
      }

      const entity = {
        key: key,
        data: this.toDatastore(data, ['description']),
      };

      this.ds.save(entity, err => {
        data.id = entity.key.id;
        if (err) throw err;
        resolve(data);
      });
    });
  }

  async getByType(type: DataStoreKeyType, value: string) {
      const query = this.ds
        .createQuery(this.datastoreKey)
        .filter(type, '=', value);
  
      const { err, result } = await this.ds.runQuery(query);
      if (err) throw err;
      return result[0][0];
  }

  async create(data) {
    return await this.update(null, data);
  }

  toDatastore(obj, nonIndexed) {
    nonIndexed = nonIndexed || [];
    const results = [];
    Object.keys(obj).forEach(k => {
      if (obj[k] === undefined) {
        return;
      }
      results.push({
        name: k,
        value: obj[k],
        excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
      });
    });
    return results;
  }
}
