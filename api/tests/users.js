import chai from 'chai';
import chaiHttp from 'chai-http';
import db, { pool } from '../models/connect-test';
import app from '../../server';
import users from '../controllers/users';

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
  datemodified: theDate(),
};

const newUser = {
  id: 3,
  userEmail: 'liz@Mel.com',
  userName: 'Mel Lisa',
  userPriviledge: 'User',
  password: '123456',
  password2: '123456',
};

describe('Test all user routes', () => {
  // before((done) => {
  //   pool.query('DELETE FROM users');
  //   done();
  // });

  // before((done) => {
  //   pool.query('DELETE FROM users', (err) => {
  //     pool.end();
  //     done();
  //   });
  // });

  describe('/api/vi/auth/login users', () => {
    it('should sign in user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(admin)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('password');
        });
      done();
    });

    it('should return error for wrong details', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send()
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
  });

  describe('signup route', () => {
    it('should register a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('x-access-token', admin.token)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });


  describe('GET /users Routes', () => {
    // * Test the GET api/users route

    it('it should GET all the users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('x-access-token', admin.token)
        .end((err, res) => {
          // should.exist(res.body);
          res.body.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET users/:id', () => {
    // * Test the GET api/users route

    it('it should GET a single user', (done) => {
      chai.request(app)
        .get('/api/v1/users/2')
        .set('x-access-token', admin.token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(200);
          // res.body.items.length.should.be.eql(1);
          res.body.should.have.property('username');
          res.body.should.have.property('useremail').eql('way@ward.com');
          res.body.should.have.property('password');
          res.body.id.should.be.a('number').eql(2);
          res.body.should.have.property('userpriviledge').eql('User');
          done();
        });
    });
  });

  // Test the PUT api / users
  // describe('/PUT users', () => {
  //   it.only('it should update a user', (done) => {
  //     chai.request(app)
  //       .put('/api/v1/users/2')
  //       .set('x-access-token', admin.token)
  //       .send({ attendant })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });


  // describe('/DELETE/:id user', () => {
  //   it('it should DELETE a user given the id', (done) => {
  //     chai.request(app)
  //       .delete('/api/v1/users/4')
  //       .set('x-access-token', admin.token)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });
});
