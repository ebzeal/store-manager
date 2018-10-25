import express from 'express';
import Product from './controllers/products';

const app = express();
app.use(express.json());
app.get('/', (req, res) => res.status(200).send('<h1>Welcome to the Store Manager App</h1> <br> Sorry, no colours. These are purely endpoints'));

// View all Products
app.get('/api/v1/products', Product.getAll);
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
module.exports = app;
