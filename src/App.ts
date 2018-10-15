import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as logger from 'morgan';
import * as passport from 'passport';

import GroceryRouter from './routes/grocery.route';
import PingRouter from './routes/ping.route';
import UserRouter from './routes/user.route';

import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./../build/swagger.json');

class App {
  
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(
      session({
        secret: 'food-me-api',
        resave: false,
        saveUninitialized: false,
      })
    );
    this.express.use(passport.initialize());
    require('./config/passport');
  }

  private routes(): void {
    let router = express.Router();
    this.express.use('/', router);
    this.express.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
    this.express.use('/grocery', GroceryRouter);
    this.express.use('/ping', PingRouter);
    this.express.use('/user', UserRouter);
  }
}

export default new App().express;
