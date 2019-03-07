import chai from 'chai';
import chaiHttp from 'chai-http';
import db, { pool } from '../models/connect-test';
import app from '../../server';
import categories from '../controllers/categories';

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

const category1 = {
  id: 1,
  categoryName: 'Toiletries',
  categoryDetails: 'For the toilet',
};

const newCategory = {
  id: 1,
  categoryName: 'Toiletries',
  categoryDetails: 'For the toilet',
};


describe('Test all categories routes', () => {

  describe('POST /categories ', () => {
    it('should create a new category', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .set('content-Type', 'application/json')
        .set('authorization', admin.token)
        .send(newCategory)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('GET /categories Routes', () => {
    it('it should GET all the categories', (done) => {
      chai.request(app)
        .get('/api/v1/categories/')
        .set('content-Type', 'application/json')
        .set('authorization', attendant.token)
        .end((err, res) => {
          // should.exist(res.body);
          res.body.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET categories/:id', () => {
    // * Test the GET api/categories route

    it('it should GET a single category', (done) => {
      chai.request(app)
        .get('/api/v1/categories/1')
        .set('content-Type', 'application/json')
        .set('authorization', attendant.token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(200);
          // res.body.items.length.should.be.eql(1);
          res.body.should.have.property('categoryname');
          res.body.should.have.property('categorydetails');
          done();
        });
    });
  });

  // // Test the PUT api / categories
  // describe('/PUT categories', () => {
  //   it.only('it should update a user', (done) => {
  //     chai.request(app)
  //       .put('/api/v1/categories/2')
  //       .set('authorization', admin.token)
  //       .send({ attendant })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });


  // describe('/DELETE/:id category', () => {
  //   it('it should DELETE a category given the id', (done) => {
  //     chai.request(app)
  //       .delete('/api/v1/categories/3')
  //       .set('authorization', admin.token)
  //       .end((err, res) => {
  //         res.should.have.status(204);
  //         done();
  //       });
  //   });
  // });
});
