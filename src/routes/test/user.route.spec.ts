import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from './../../App';
import { User } from './../../models';
import { token } from './test-token';

chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = '/user';

const userBody: User = {
  name: 'Test User',
  email: 'test.user@example.com',
  password: '1234',
};

const loginBody = {
  email: 'test.user@example.com',
  password: '1234',
};

describe(`POST ${baseUrl}`, () => {
  it('should post user with email test.user@example.com', done => {
    chai
      .request(app)
      .post('/user')
      .set('content-type', 'application/json')
      .send(userBody)
      .then(res => {
        expect(res.body).to.exist;
        expect(res.body.token).to.exist;
        done();
      });
  });

  it('should login user with email test.user@example.com', done => {
    chai
      .request(app)
      .post('/user/login')
      .set('content-type', 'application/json')
      .send(loginBody)
      .then(res => {
        expect(res.body).to.exist;
        expect(res.body.token).to.exist;
        done();
      });
  });
});

describe(`GET ${baseUrl}`, () => {
  it('should return user with email test.user@example.com', done => {
    chai
      .request(app)
      .get('/user/test.user@example.com')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.email).to.eql('test.user@example.com');
        done();
      });
  });
});
