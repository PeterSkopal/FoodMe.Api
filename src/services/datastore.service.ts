const Datastore = require('@google-cloud/datastore');

import { DataStoreKeyType } from './../models';

export class DatastoreService {
  ds: any;
  datastoreKey: string;

  constructor(kind: string) {
    this.ds = Datastore({
      keyFilename: './gcp-dev-key.json',
      projectId: 'food-me-api',
    });
    this.datastoreKey = kind;
  }

  async getByType(type: DataStoreKeyType, value: string) {
    return new Promise(resolve => {
      const query = this.ds
        .createQuery(this.datastoreKey)
        .filter(type, '=', value);

      this.ds.runQuery(query).then(result => {
        resolve(this.fromDatastore(result[0][0]));
      });
    });
  }

  async getAllByType(type: DataStoreKeyType, value: string) {
    return new Promise(resolve => {
      const query = this.ds
        .createQuery(this.datastoreKey)
        .filter(type, '=', value);

      this.ds.runQuery(query).then(result => {
        resolve(result[0].map(this.fromDatastore));
      });
    });
  }

  async create(data, id?) {
    return new Promise(resolve => {
      let key;
      if (id) {
        key = this.ds.key([this.datastoreKey, id]);
      } else {
        key = this.ds.key(this.datastoreKey);
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

  fromDatastore(obj) {
    obj.id = obj[Datastore.KEY].id;
    return obj;
  }
}
