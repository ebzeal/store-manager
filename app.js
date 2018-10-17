import express from 'express';
// load routes
import products from './routes/products';
// import * as Joi from 'joi';

const app = express();

app.use(express.json());
app.use('/api/products', products);
app.get('/', (req, res) => res.status(200).send('Welcome'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
