import { Response } from 'express';
import { Body, Get, Route, Controller, Tags, Post, Delete } from 'tsoa';

import { Grocery } from './../models';
import { GroceryRepository } from './../repositories/grocery.repository';
import { UserRepository } from './../repositories/user.repository';

@Tags('Grocery')
@Route('grocery')
export class GroceryController extends Controller {
  groceryRepo: GroceryRepository;
  userRepo: UserRepository;
  res: Response;
  userEmail: string;

  constructor() {
    super();
    this.groceryRepo = new GroceryRepository();
    this.userRepo = new UserRepository();
  }

  setRes(res: Response) {
    this.res = res;
  }

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  @Post()
  public async addGrocery(@Body() body: Grocery[]) {
    body.map(val => {
      val.inserted = new Date();
      val.email = this.userEmail;
    });

    const groceries = await this.groceryRepo.addGrocery(body);
    this.res.send(groceries);
  }

  @Get()
  public async getAllGroceries() {
    let groceries = await this.groceryRepo.getAllGroceries(this.userEmail);
    for (let i = 0; i < groceries.length; i++) {
      let g = groceries[i]
      groceries[i] = { name: g.name, inserted: g.inserted, id: g.id}
    }
    this.res.send(groceries);
  }

  @Delete('{id}')
  public async deleteGrocery(id) {
    const deleted = await this.groceryRepo.deleteGrocery(id);
    this.res.send(deleted);
  }
}
