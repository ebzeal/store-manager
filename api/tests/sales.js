import chai from 'chai';
import chaiHttp from 'chai-http';
import db, { pool } from '../models/connect-test';
import app from '../../server';
import sales from '../controllers/sales';

const should = chai.should();
const theDate = () => new Date();

chai.use(chaiHttp);
const admin = {
  id: 1,
  userEmail: 'olu@me.com',
  password: '$2a$08$HM8vn5rE0cnSGbd68Gi7BOacCvnD1tb9fcuhJdR04wrFH3ng8c6NS',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJvbHUgU29sYSIsInVzZXJQcml2aWxlZGdlIjoiQWRtaW4iLCJpYXQiOjE1NDE5MjIwODQsImV4cCI6MTU3MzAyNjA4NH0.KZgSbncTwpmuY89eyZ_QFu6HhGqI-d5jfKNqAV2DbQY',
};

const attendant = {
  userEmail: 'way@ward.com',
  userName: 'Ways Ward',
  userPriviledge: 'User',
  password: '$2a$08$HM8vn5rE0cnSGbd68Gi7BOacCvnD1tb9fcuhJdR04wrFH3ng8c6NS',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlck5hbWUiOiJXYXkgV2FyZCIsInVzZXJQcml2aWxlZGdlIjoiVXNlciIsImlhdCI6MTU0MTkyMjI3MiwiZXhwIjoxNTczMDI2MjcyfQ.SMlk345LLUmwzVu3XfA8g3H07w5niXdltVomhgnakVk',
};

const newSales = {
  id: '1',
  salesid: '2',
  attendant: '2',
  productName: '3',
  quantity: '4',
  amount: '4000',
};

describe('Test all sales routes', () => {

  describe('POST /sales ', () => {
    it('should create a new product', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('authorization', attendant.token)
        .send(newSales)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('GET /sales Routes', () => {
    it('it should GET all the sales', (done) => {
      chai.request(app)
        .get('/api/v1/sales/')
        .set('authorization', admin.token)
        .end((err, res) => {
          // should.exist(res.body);
          res.body.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET sales/:id', () => {
    // * Test the GET api/sales route

    it('it should GET a single sale', (done) => {
      chai.request(app)
        .get('/api/v1/sales/2')
        .set('authorization', admin.token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(200);
          // res.body.items.length.should.be.eql(1);
          res.body.should.have.property('productname');
          res.body.should.have.property('attendant');
          res.body.should.have.property('amount');
          done();
        });
    });
  });
});
