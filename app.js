import express from 'express';
// import routes
import products from './routes/products';
import sales from './routes/sales';
// import * as Joi from 'joi';

const app = express();

// load routes
app.use(express.json());
app.use('/api/products', products);
app.use('/api/sales/', sales);
app.get('/', (req, res) => res.status(200).send('Welcome'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;
