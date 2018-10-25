// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
// import uuid from 'uuid';
// import moment from 'moment';
import app from '../server';
let should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);


describe('Task API Routes', () => {
  // This function will run before every test to clear database
  // beforeEach((done) => {
  //   done();
  // });

  /*
    * Test the GET api/products route
    */
  describe('/GET products', () => {
    it('it should GET all the products', (done) => {
      chai.request(app)
        .get('/api/v1/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
