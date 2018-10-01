import { Response } from 'express';
import { Body, Get, Route, Controller, Tags, Path, Post } from 'tsoa';

import { User } from './../models'
import { UserRepository } from './../repositories/user.repository';

@Tags('User')
@Route('user')
export class UserController extends Controller {
  userRepo: UserRepository;
  res: Response;

  constructor() {
    super();
    this.userRepo = new UserRepository();
  }

  setRes(res: Response) {
    this.res = res;
  }
  
  @Post()
  public async addUser(@Body() body: User) {
    const user = await this.userRepo.addUser(body);
    this.res.send(user);
  }

  @Get('{email}')
  public async getUser(@Path() email: string) {
    const user = await this.userRepo.getUser(email);
    this.res.send(user);
  }
}
