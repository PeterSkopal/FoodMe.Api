import { Response, Request, Router } from 'express';
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
    this.router.get('/:email', (req: Request, res: Response) => {
      this.ctrl.setRes(res);
      this.ctrl.getUser(req.params.email);
    });
    this.router.post('/', (req: Request, res: Response) => {
      this.ctrl.setRes(res);
      this.ctrl.addUser(req.body);
    });
  }
}

const userRoutes = new UserRouter();

export default userRoutes.router;
