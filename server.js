import express from 'express';
// import dotenv from 'dotenv';
import 'babel-polyfill';
import bodyParser from 'body-parser';
import User from './api/controllers/users';
import Product from './api/controllers/products';
import Sales from './api/controllers/sales';
import Category from './api/controllers/categories';
import Incident from './api/controllers/incidents';


// dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.get('/api/v1/', (req, res) => res.status(200).json('Welcome'));

// Load auth Routes
app.post('/api/v1/auth/login', User.logIn);
app.post('/api/v1/auth/signup', User.signUp);

// Load User Routes
app.get('/api/v1/users', User.getAll);
app.get('/api/v1/users/:id', User.getOne);
app.get('/api/v1/users/profile/:id', User.getOwn);
app.put('/api/v1/users/:id', User.update);
app.delete('/api/v1/users/:id', User.delete);

// Load Category Routes
app.get('/api/v1/categories', Category.getAll);
app.get('/api/v1/categories/:id', Category.getOne);
app.post('/api/v1/categories', Category.create);
app.put('/api/v1/categories/:id', Category.update);
app.delete('/api/v1/categories/:id', Category.delete);

// Load Product Routes
app.get('/api/v1/products', Product.getAll);
app.get('/api/v1/products/:id', Product.getOne);
app.post('/api/v1/products', Product.create);
app.put('/api/v1/products/:id', Product.update);
app.delete('/api/v1/products/:id', Product.delete);

// Load Sales Routes
app.get('/api/v1/sales', Sales.getAll);
app.get('/api/v1/sales/:id', Sales.getOne);
app.post('/api/v1/sales', Sales.create);

// Load Incidents Routes
app.get('/api/v1/incidents', Incident.getAll);
app.get('/api/v1/incidents/:id', Incident.getOne);
app.post('/api/v1/incidents', Incident.create);
app.put('/api/v1/incidents/:id', Incident.update);
app.delete('/api/v1/incidents/:id', Incident.delete);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));

export default app;
