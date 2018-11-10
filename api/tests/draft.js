// import chai from 'chai';
// import app from '../../server';
// // import { adminAccess } from '../validation/auth';

// const should = chai.should();

// function adminAccess(user) {
//   return new Promise((resolve, reject) => {
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlck5hbWUiOiJCYXJuZXkiLCJ1c2VyUHJpdmlsZWRnZSI6IkFkbWluIiwiaWF0IjoxNTQxMTI1NjQ4LCJleHAiOjE1NDExMzY0NDh9.JjsJ_lvpEPh8fYDldYrpGDYqq-brp3xmdCbtAjTJOVQ';
//     const decoded = {};
//     decoded.userPriviledge = 'Admin';
//     if (token && decoded.userPriviledge) {
//       resolve(user);
//     } else {
//       reject();
//     }
//   });

// }

// adminAccess();

// describe('All user routes', () => {
//   describe('/GET users', () => {
//     it.only('should return all users', (done) => {
//       adminAccess()
//         .then(() => {
//           chai.request(app)
//             .get('/api/v1/users');
//           done();
//         });

//     });
//   });
// });
