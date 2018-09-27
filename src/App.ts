import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';

import PingRouter from './routes/ping.route';

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
  }

  private routes(): void {
    let router = express.Router();
    this.express.use('/', router);
    this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.express.use('/ping', PingRouter);
  }

}

export default new App().express;