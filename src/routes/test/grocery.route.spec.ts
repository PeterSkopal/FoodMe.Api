import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from './../../App';

chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = '/grocery';

const groceriesBody = [
  { name: 'milk' },
  { name: 'oats' },
  { name: 'blueberries' }
]

describe(`GET ${baseUrl}`, () => {

  it('should return all groceries linked to john.doe@example.com', () => {
    return chai.request(app).get('/grocery/john.doe@example.com')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body).to.exist;
    });
  });

});

describe (`POST ${baseUrl}`, () => {

  it('should post all groceries in body, and link to john.doe@example.com', () => {
    return chai.request(app).post('/grocery')
    .set('content-type', 'application/json')
    .send(groceriesBody)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
    });
  });

});
