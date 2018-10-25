// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import moment from 'moment';
import app from '../server';
import Product from '../models/product';
let should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);


describe('Task API Routes', () => {
  // This function will run before every test to clear database
  // beforeEach((done) => {
  //   done();
  // });


  // * Test the GET api/products route

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

  // Test the POST api/products
  describe('/POST products', () => {
    it('it should save a new product', (done) => {
      chai.request(app)
        .post('/api/v1/products')
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
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  // Test the PUT api / products
  // describe('/PUT products', () => {
  //   it('it should update a product', (done) => {
  //     const product = new Product({
  //       id: uuid.v4(),
  //       productCategory: 'Men Clothing',
  //       productName: 'socks',
  //       productImage: 'abdmdkssi',
  //       productDetails: 'for the feet',
  //       productSpec: 'packs',
  //       productPrice: 300,
  //       dateAdded: moment.now(),
  //       dateModified: moment.now(),
  //     });
  //     product.save((err) => {
  //       chai.request(app)
  //         .put('/api/v1/products/' + product.id)
  //         .send({
  //           id: uuid.v4(),
  //           productCategory: 'Men Clothing',
  //           productName: 'socks',
  //           productImage: 'abdmdkssi',
  //           productDetails: 'for the feet',
  //           productSpec: 'packs',
  //           productPrice: 300,
  //           dateAdded: moment.now(),
  //           dateModified: moment.now(),
  //         })
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           done();
  //         });
  //     });
  //   });
  // });

  // describe('/DELETE/:id product', () => {
  //   it('it should DELETE a product given the id', (done) => {
  //     const product = new Product({
  //       id: uuid.v4(),
  //       productCategory: "Men Clothing",
  //       productName: "socks",
  //       productImage: "abdmdkssi",
  //       productDetails: "for the feet",
  //       productSpec: "packs",
  //       productPrice: 300,
  //       dateAdded: moment.now(),
  //       dateModified: moment.now(),
  //     })
  //     product.save((err, product) => {
  //       chai.request(app)
  //         .delete('/product/' + product.id)
  //         .end((err, res) => {
  //           res.should.have.status(204);
  //           res.body.should.be.a('object');
  //           done();
  //         });
  //     });
  //   });
  // });
});
