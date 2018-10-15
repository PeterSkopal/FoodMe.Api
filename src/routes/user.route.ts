import { Response, Request, Router } from 'express';
import * as passport from 'passport';

import { auth } from './auth';
import { UserController } from './../controllers/user.controller';

export class UserRouter {
  router: Router;
  ctrl: UserController;

  constructor() {
    this.router = Router();
    this.ctrl = new UserController();

    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/', auth.optional, (req: Request, res: Response) => {
      this.ctrl.setRes(res);
      this.ctrl.addUser(req.body);
    });
    this.router.get('/:email', auth.required, (req: Request, res: Response) => {
      this.ctrl.setRes(res);
      this.ctrl.getUserByEmail(req.params.email);
    });
    this.router.post('/login',
      passport.authenticate('local', { session: false }),
      (req: Request, res: Response) => {
        this.ctrl.setRes(res);
        this.ctrl.loginUser(req.user);
      }
    );
  }
}

const userRoutes = new UserRouter();

export default userRoutes.router;
