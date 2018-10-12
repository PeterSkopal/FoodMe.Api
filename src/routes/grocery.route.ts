import { Response, Request, Router } from 'express';
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
    this.router.get('/:email', (req: Request, res: Response) => {
      this.ctrl.setRes(res);
      this.ctrl.getAllGroceries(req.params.email);
    });
    this.router.post('/', (req: Request, res: Response) => {
      this.ctrl.setRes(res);
      this.ctrl.addGrocery(req.body);
    });
  }
}

const groceryRoutes = new GroceryRouter();

export default groceryRoutes.router;
