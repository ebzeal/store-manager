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
    * Test the GET api/sales route
    */
  describe('/GET sales', () => {
    it('it should GET all the sales', (done) => {
      chai.request(app)
        .get('/api/v1/sales')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  // Test the / GET /: id route
  describe('/GET/:id sale', () => {
    it('it should GET a sale by the given id', (done) => {
      const sale = {
        id: uuid.v4(),
        attendant: 'John Doe',
        saleName: 'socks',
        quantity: 45,
        amount: 400,
        salesTime: moment.now(),
        salesDate: moment.now(),
      };
      chai.request(app)
        .get('/api/v1/sales/:id', sale.id)
        .send({ sale })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });

    });
  });


  // Test the POST api/v1/sales
  describe('/POST sales', () => {
    it('it should save a new sale', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .send({
          id: uuid.v4(),
          attendant: 'John Doe',
          saleName: 'socks',
          quantity: 45,
          amount: 400,
          salesTime: moment.now(),
          salesDate: moment.now(),
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });

});
