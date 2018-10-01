import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from './../../App';

chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = '/user';

describe(`GET ${baseUrl}`, () => {

  it('should return user with email peter.skopal@hotmail.com', () => {
    return chai.request(app).get('/user/peter.skopal@hotmail.com')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.email).to.eql('peter.skopal@hotmail.com');
    });
  });

});
