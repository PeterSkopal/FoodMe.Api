import { Response } from 'express';
import { Body, Get, Route, Controller, Tags, Path, Post } from 'tsoa';

import { User } from './../models';
import { AuthService } from './../services/auth.service';
import { UserRepository } from './../repositories/user.repository';

@Tags('User')
@Route('user')
export class UserController extends Controller {
  auth: AuthService;
  res: Response;
  userRepo: UserRepository;

  constructor() {
    super();
    this.userRepo = new UserRepository();
    this.auth = new AuthService();
  }

  setRes(res: Response) {
    this.res = res;
  }

  @Post()
  public async addUser(@Body() body: User) {
    const { hash, salt } = this.auth.getPassword(body.password);
    const userToken = this.auth.toAuthJSON(body.email);
    body = {
      name: body.name,
      email: body.email,
      hash,
      salt,
      token: userToken.token,
    };
    await this.userRepo.addUser(body);
    this.res.send(userToken);
  }

  @Get('{email}')
  public async getUserByEmail(@Path() email: string) {
    const user = await this.userRepo.getUserByEmail(email);
    this.res.send(user);
  }

  @Post('login')
  public async loginUser(@Body() user: User) {
    const tokenUser = this.auth.toAuthJSON(user.email);
    await this.userRepo.updateUser(tokenUser.email, tokenUser.token);
    this.res.send(tokenUser);
  }
}
