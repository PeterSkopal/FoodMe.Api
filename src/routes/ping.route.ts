import { Response, Request, Router } from 'express';
import { PingController } from './../controllers/ping.controller';

export class PingRouter {
  router: Router;
  ctrl: PingController;

  constructor() {
    this.router = Router();
    this.ctrl = new PingController();

    this.initRoutes();
  }
  
  initRoutes() {
    this.router.get('/', (req: Request, res: Response) => res.send(this.ctrl.getPong()));
  }
}

const pingRoutes = new PingRouter();

export default pingRoutes.router;