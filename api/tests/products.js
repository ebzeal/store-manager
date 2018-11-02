// // Require the dev-dependencies
// // import should from 'should';
// import db from '../connect';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../server';
// import product from '../controllers/products';


// process.env.NODE_ENV = 'test';

// const should = chai.should();

// const theDate = () => new Date();
// // During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// chai.use(chaiHttp);


// describe('Test API Routes', () => {

//   // * Test the GET api/products route

//   describe('/GET products', () => {
//     it('it should GET all the products', (done) => {
//       chai.request(app)
//         .get('/api/v1/products')
//         .end((err, res) => {
//           // should.exist(res.body);
//           chai.should().exist(res.body);
//           res.body.should.be.a('object');
//           res.should.have.status(200);
//           res.body.should.have.property('productName');
//           // res.body.should.have.property('productPriviledge').eql('Admin' || 'product');
//           done();
//         });
//     });
//   });

//   // Test the POST api/products
//   describe('/POST products', () => {
//     it('it should save a new product', (done) => {
//       chai.request(app)
//         .post('/api/v1/products')
//         .send({
//           id: uuid.v4(),
//           productCategory: 'Men Clothing',
//           productName: 'socks',
//           productImage: 'abdmdkssi',
//           productDetails: 'for the feet',
//           productSpec: 'packs',
//           productPrice: 300,
//           userPriviledge: 'Admin',
//           dateAdded: theDate(),
//           dateModified: theDate(),
//         })
//         .end((err, res) => {
//           // res.should.have.status(201);
//           res.body.should.be.a('object');
//           // res.body.should.have.property('productPriviledge').eql('Admin');
//           // res.body.should.have.property('productName');
//           // res.body.should.have.property('productEmail');
//           // res.body.should.have.property('productPriviledge');
//           done();
//         });
//     });
//   });

//   // // Test the PUT api / products
//   describe('/PUT products', () => {
//     it('it should update a product', (done) => {
//       const product = product.signUp({
//         id: uuid.v4(),
//         productCategory: 'Men Clothing',
//         productName: 'socks',
//         productImage: 'abdmdkssi',
//         productDetails: 'for the feet',
//         productSpec: 'packs',
//         productPrice: 300,
//         userPriviledge: 'Admin',
//         dateAdded: theDate(),
//         dateModified: theDate(),
//       });

//       chai.request(app)

//         .put('/api/v1/products/' + product.id)
//         .send({
//           id: 10,
//           productCategory: 'Men Clothing',
//           productName: 'socks',
//           productImage: 'abdmdkssi',
//           productDetails: 'for the feet',
//           productSpec: 'packs',
//           productPrice: 300,
//           userPriviledge: 'Admin',
//           dateAdded: theDate(),
//           dateModified: theDate(),
//         })
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });

//   describe('/DELETE/:id product', () => {
//     it('it should DELETE a product given the id', (done) => {
//       const product = new product({
//         id: uuid.v4(),
//         productCategory: "Men Clothing",
//         productName: "socks",
//         productImage: "abdmdkssi",
//         productDetails: "for the feet",
//         productSpec: "packs",
//         productPrice: 300,
//         dateAdded: moment.now(),
//         dateModified: moment.now(),
//       })
//       product.save((err, product) => {
//         chai.request(app)
//           .delete('/product/' + product.id)
//           .end((err, res) => {
//             res.should.have.status(204);
//             res.body.should.be.a('object');
//             done();
//           });
//       });
//     });
//   });
// });
