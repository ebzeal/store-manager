import express from 'express';
// import dotenv from 'dotenv';
import 'babel-polyfill';
import bodyParser from 'body-parser';
// add routes
import users from './api/routes/users';
import auth from './api/routes/auth';
import sales from './api/routes/sales';
import products from './api/routes/products';
import categories from './api/routes/categories';
import incidents from './api/routes/incidents';


// dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.get('/api/v1/', (req, res) => res.status(200).json('Welcome'));


// use routes
app.use('/api/v1/sales', sales);
app.use('/api/v1/products', products);
app.use('/api/v1/categories', categories);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/incidents', incidents);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));

export default app;
