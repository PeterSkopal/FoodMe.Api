import { DataStoreKeyType, DataStoreKindType, User } from './../models'
import { DatastoreService } from '../serivices/datastore.service';

export class UserRepository {
  datastoreService: DatastoreService;
  datastoreKey = DataStoreKindType.USER;

  constructor() {
    this.datastoreService = new DatastoreService(this.datastoreKey);
  }

  public async addUser(body: User) {
    return await this.datastoreService.create(body, body.email);
  }

  public async getUser(email: string) {
    return await this.datastoreService.getByType(DataStoreKeyType.EMAIL, email);
  }

}