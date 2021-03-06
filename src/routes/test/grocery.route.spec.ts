import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from './../../App';
import { token } from './test-token';

chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = '/grocery';

const groceriesBody = [
  { name: 'milk' },
  { name: 'oats' },
  { name: 'blueberries' },
];

describe(`GET ${baseUrl}`, () => {
  it('should return all groceries linked to test.user@example.com', done => {
    chai
      .request(app)
      .get('/grocery')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        done();
      });
  });
});

describe(`POST ${baseUrl}`, () => {
  it('should post all groceries in body, and link to test.user@example.com', done => {
    chai
      .request(app)
      .post('/grocery')
      .set('content-type', 'application/json')
      .set('Authorization', token)
      .send(groceriesBody)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe(`DELETE ${baseUrl}`, () => {
  it('should delete one grocery', done => {
    chai
      .request(app)
      .get('/grocery')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).to.equal(200);
        chai
          .request(app)
          .del(`/grocery/${res.body[0].id}`)
          .set('Authorization', token)
          .then(res => {
            expect(res.status).to.equal(200);
            done();
          });
      });
  });
});
