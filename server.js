import express from 'express';
import Product from './api/controllers/products';
import Sales from './api/controllers/sales';

const app = express();
app.use(express.json());
app.get('/api/v1/', (req, res) => res.status(200).json('Welcome'));

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));

export default app;
