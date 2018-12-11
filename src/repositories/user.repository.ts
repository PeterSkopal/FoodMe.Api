import { DataStoreKeyType, DataStoreKindType, User } from './../models'
import { DatastoreService } from '../services/datastore.service';

export class UserRepository {
  datastoreService: DatastoreService;
  datastoreKey = DataStoreKindType.USER;

  constructor() {
    this.datastoreService = new DatastoreService(this.datastoreKey);
  }

  public async addUser(body: User) {
    return await this.datastoreService.create(body, body.email);
  }

  public async updateUser(email: string, token: string) {
    let user = await this.getUserByEmail(email);
    user = { ...user, token };
    return await this.datastoreService.create(user, email);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.datastoreService.getByType(DataStoreKeyType.EMAIL, email);
  }

}
