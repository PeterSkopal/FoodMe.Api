import { Response } from 'express';
import { Body, Get, Route, Controller, Tags, Post } from 'tsoa';

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
    const grocery = await this.groceryRepo.getAllGroceries(this.userEmail);
    this.res.send(grocery);
  }
}
