import db from '../connect';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import users from '../controllers/users';


// process.env.NODE_ENV = 'test';

const should = chai.should();

const theDate = () => new Date();
const userCredentials = {
  email: 'olu@yahoo.com',
  password: '123456',
};
// now let's login the user before we run any tests
const authenticatedUser = request.agent(app);

before((done) => {
  authenticatedUser
    .post('/login')
    .send(userCredentials)
    .end(function (err, response) {
      expect(response.statusCode).to.equal(200);
      expect('Location', '/home');
      done();
    });
});


describe('Test API Routes', () => {

  // * Test the GET api/users route

  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          // should.exist(res.body);
          chai.should().exist(res.body);
          res.body.should.be.a('object');
          res.should.have.status(200);
          // res.body.should.have.property('userName');
          // res.body.should.have.property('userPriviledge').eql('Admin' || 'User');
          done();
        });
    });
  });

  //   // Test the POST api/users
  //   describe('/POST users', () => {
  //     it('it should save a new user', (done) => {
  //       chai.request(app)
  //         .post('/api/v1/users')
  //         .send({
  //           id: 10,
  //           userName: 'Karl Heinz',
  //           userEmail: 'me@you.com',
  //           userPriviledge: 'Admin',
  //           pasword: '123456',
  //           password2: '123456',
  //           dateCreated: theDate(),
  //           dateModified: theDate(),
  //         })
  //         .end((err, res) => {
  //           // res.should.have.status(201);
  //           res.body.should.be.a('object');
  //           // res.body.should.have.property('userPriviledge').eql('Admin');
  //           // res.body.should.have.property('userName');
  //           // res.body.should.have.property('userEmail');
  //           // res.body.should.have.property('userPriviledge');
  //           done();
  //         });
  //     });
  //   });

  //   // // Test the PUT api / users
  //   describe('/PUT users', () => {
  //     it('it should update a user', (done) => {
  //       const user = User.signUp({
  //         id: 10,
  //         userName: 'Karl Heinz',
  //         userEmail: 'me@you.com',
  //         userPriviledge: 'Admin',
  //         pasword: '123456',
  //         password2: '123456',
  //         dateCreated: theDate(),
  //         dateModified: theDate(),
  //       });

  //       chai.request(app)

  //         .put('/api/v1/users/' + user.id)
  //         .send({
  //           id: 10,
  //           userName: 'Karl Heinz',
  //           userEmail: 'me@you.com',
  //           userPriviledge: 'User',
  //           pasword: '123456',
  //           password2: '123456',
  //           dateCreated: theDate(),
  //           dateModified: theDate(),
  //         })
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           done();
  //         });
  //     });
  //   });

  //   describe('/DELETE/:id user', () => {
  //     it('it should DELETE a user given the id', (done) => {
  //       const user = new User({
  //         id: uuid.v4(),
  //         userCategory: "Men Clothing",
  //         userName: "socks",
  //         userImage: "abdmdkssi",
  //         userDetails: "for the feet",
  //         userSpec: "packs",
  //         userPrice: 300,
  //         dateAdded: moment.now(),
  //         dateModified: moment.now(),
  //       })
  //       user.save((err, user) => {
  //         chai.request(app)
  //           .delete('/user/' + user.id)
  //           .end((err, res) => {
  //             res.should.have.status(204);
  //             res.body.should.be.a('object');
  //             done();
  //           });
  //       });
  //     });
  //   });
});
