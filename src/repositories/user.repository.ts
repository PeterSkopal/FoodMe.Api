const Datastore = require('@google-cloud/datastore');

import { User } from './../models'
import { DatastoreService } from '../serivices/datastore.service';

export class UserRepository {
  datastoreService: DatastoreService;
  datastoreKey = 'User';

  constructor() {
    this.datastoreService = new DatastoreService(this.datastoreKey);
  }

  public async addUser(body: User) {
    return await this.datastoreService.create(body);
  }

  public async getUser(email: string) {
    return await this.datastoreService.getByType('email', email);
  }

}