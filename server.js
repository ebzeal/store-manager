import path from 'path';
import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
import 'babel-polyfill';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swaggers.json';
// add routes
import users from './api/routes/users';
import auth from './api/routes/auth';
import sales from './api/routes/sales';
import products from './api/routes/products';
import categories from './api/routes/categories';
import incidents from './api/routes/incidents';
import notifications from './api/routes/notifications';
import search from './api/routes/search';


// dotenv.config();

const app = express();
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE',
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
app.get('/api/v1/', (req, res) => res.status(200).json('Welcome'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// use routes
app.use('/api/v1/sales', sales);
app.use('/api/v1/products', products);
app.use('/api/v1/categories', categories);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/incidents', incidents);
app.use('/api/v1/notifications', notifications);
app.use('/api/v1/search', search);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));

export default app;
