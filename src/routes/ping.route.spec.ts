// import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from './../App';

chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = '/ping';

describe(`GET ${baseUrl}`, () => {

  it('should return pong', () => {
    return chai.request(app).get('/ping')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.text).to.eql('pong');
    });
  });

});