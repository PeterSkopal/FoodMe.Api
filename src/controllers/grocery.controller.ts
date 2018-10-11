import { Response } from 'express';
import { Body, Get, Route, Controller, Tags, Path, Post } from 'tsoa';

import { Grocery } from './../models'
import { GroceryRepository } from './../repositories/grocery.repository';

@Tags('Grocery')
@Route('grocery')
export class GroceryController extends Controller {
  groceryRepo: GroceryRepository;
  res: Response;

  constructor() {
    super();
    this.groceryRepo = new GroceryRepository();
  }

  setRes(res: Response) {
    this.res = res;
  }
  
  @Post()
  public async addGrocery(@Body() body: Grocery[]) {
    const currentUserEmail = 'john.doe@example.com'; // needs to be retrieved from session
    
    body.map(val => {
      val.inserted = new Date()
      val.email = currentUserEmail
    });

    const groceries = await this.groceryRepo.addGrocery(body);
    this.res.send(groceries);
  }

  @Get('{email}')
  public async getAllGroceries(@Path() email: string) {
    const grocery = await this.groceryRepo.getAllGroceries(email);
    this.res.send(grocery);
  }
}
