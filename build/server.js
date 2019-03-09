'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

require('babel-polyfill');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _swaggers = require('./swaggers.json');

var _swaggers2 = _interopRequireDefault(_swaggers);

var _users = require('./api/routes/users');

var _users2 = _interopRequireDefault(_users);

var _auth = require('./api/routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _sales = require('./api/routes/sales');

var _sales2 = _interopRequireDefault(_sales);

var _products = require('./api/routes/products');

var _products2 = _interopRequireDefault(_products);

var _categories = require('./api/routes/categories');

var _categories2 = _interopRequireDefault(_categories);

var _incidents = require('./api/routes/incidents');

var _incidents2 = _interopRequireDefault(_incidents);

var _notifications = require('./api/routes/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _search = require('./api/routes/search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dotenv.config();

// add routes

// import dotenv from 'dotenv';
var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_express2.default.json());

app.use('/uploads', _express2.default.static(_path2.default.join(__dirname, 'uploads')));
// app.use(express.static(path.join(__dirname, '../public')));
app.use(_bodyParser2.default.urlencoded());
app.use(_bodyParser2.default.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE',
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.get('/api/v1/', function (req, res) {
  return res.status(200).json('Welcome');
});

app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swaggers2.default));

// use routes
app.use('/api/v1/sales', _sales2.default);
app.use('/api/v1/products', _products2.default);
app.use('/api/v1/categories', _categories2.default);
app.use('/api/v1/auth', _auth2.default);
app.use('/api/v1/users', _users2.default);
app.use('/api/v1/incidents', _incidents2.default);
app.use('/api/v1/notifications', _notifications2.default);
app.use('/api/v1/search', _search2.default);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log('Listening on Port ' + port);
});

exports.default = app;