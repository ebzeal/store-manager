// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import moment from 'moment';
import uuid from 'uuid';
let should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);


describe('Task API Routes', () => {
  // This function will run before every test to clear database
  beforeEach((done) => {
    done();
  });

  /*
    * Test the GET api/products route
    */
  describe('/GET products', () => {
    it('it should GET all the products', (done) => {
      chai.request(app)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });


  // Test the POST api/products
  describe('/POST products', () => {
    it('it should save a new product', (done) => {
      chai.request(app)
        .post('/api/products')
        .send({
          id: uuid.v4(),
          productCategory: 'Men Clothing',
          productName: 'socks',
          productImage: 'abdmdkssi',
          productDetails: 'for the feet',
          productSpec: 'packs',
          productPrice: 300,
          dateAdded: moment.now(),
          dateModified: moment.now(),
        })
        .end((err, res) => {
          res.should.have.status(400);
          // res.should.have.status(200);
          // res.body.should.be.a('array');
          // res.body.should.have.property('productCategory');
          // res.body.should.have.property('productName');
          // res.body.should.have.property('productPrice');
          done();
        });
    });
  });

});