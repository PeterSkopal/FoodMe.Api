import { Response, Request, Router } from 'express';

import { auth } from './auth';
import { GroceryController } from './../controllers/grocery.controller';

export class GroceryRouter {
  router: Router;
  ctrl: GroceryController;

  constructor() {
    this.router = Router();
    this.ctrl = new GroceryController();

    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/', auth.required, (req: Request, res: Response) => {
      this.ctrl.setRes(res);
      this.ctrl.setUserEmail(req.payload && req.payload.email);
      this.ctrl.getAllGroceries();
    });
    this.router.post('/', auth.required, (req: Request, res: Response) => {
      this.ctrl.setRes(res);
      this.ctrl.setUserEmail(req.payload && req.payload.email);
      this.ctrl.addGrocery(req.body);
    });
  }
}

const groceryRoutes = new GroceryRouter();

export default groceryRoutes.router;
