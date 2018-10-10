import { DataStoreKeyType, DataStoreKindType, Grocery } from './../models'
import { DatastoreService } from '../serivices/datastore.service';

export class GroceryRepository {
  datastoreService: DatastoreService;
  datastoreKey = DataStoreKindType.GROCERY;

  constructor() {
    this.datastoreService = new DatastoreService(this.datastoreKey);
  }

  public async addGrocery(body: Grocery[]) {
    const res = [];

    return await Promise.all(body.map(async (grocery) => {
      res.push(await this.datastoreService.create(grocery))
    })).then(() => res);
  }

  public async getAllGroceries(email: string) {
    // @ToDo: parse out email from reponse, via .select([fields]) function
    return await this.datastoreService.getAllByType(DataStoreKeyType.EMAIL, email);
  }

}
