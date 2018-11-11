import chai from 'chai';
import chaiHttp from 'chai-http';
import db, { pool } from '../models/connect-test';
import app from '../../server';
import products from '../controllers/products';

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

const product1 = {
  id: 1,
  productCategory: 'Toiletries',
  productName: 'Bath Soap',
  productImage: 'pack.jpg',
  productDetails: 'For Fresh Bath',
  productSpec: '80mg per pack',
  productPrice: '300',
};

const newProduct = {
  id: 6,
  productCategory: 'Toiletries',
  productName: 'Wash Soap',
  productImage: 'packs.jpg',
  productDetails: 'For Fresh Bath',
  productSpec: '80mg per pack',
  productPrice: '200',
};


describe('Test all product routes', () => {

  describe('POST /products ', () => {
    it.only('should create a new product', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .set('x-access-token', admin.token)
        .send(newProduct)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('GET /products Routes', () => {
    it('it should GET all the products', (done) => {
      chai.request(app)
        .get('/api/v1/products/')
        .set('x-access-token', admin.token)
        .end((err, res) => {
          // should.exist(res.body);
          res.body.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET products/:id', () => {
    // * Test the GET api/products route

    it('it should GET a single product', (done) => {
      chai.request(app)
        .get('/api/v1/products/2')
        .set('x-access-token', attendant.token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(200);
          // res.body.items.length.should.be.eql(1);
          res.body.should.have.property('productname');
          res.body.should.have.property('productcategory');
          res.body.should.have.property('productprice');
          done();
        });
    });
  });

  // // Test the PUT api / products
  // describe('/PUT products', () => {
  //   it.only('it should update a user', (done) => {
  //     chai.request(app)
  //       .put('/api/v1/products/2')
  //       .set('x-access-token', admin.token)
  //       .send({ attendant })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });


  describe('/DELETE/:id product', () => {
    it('it should DELETE a product given the id', (done) => {
      chai.request(app)
        .delete(`/api/v1/products/${newProduct.id}`)
        .set('x-access-token', admin.token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
