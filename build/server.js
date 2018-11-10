'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('babel-polyfill');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dotenv.config();

// add routes

// import dotenv from 'dotenv';
var app = (0, _express2.default)();
app.use(_express2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.get('/api/v1/', function (req, res) {
  return res.status(200).json('Welcome');
});

// use routes
app.use('/api/v1/sales', _sales2.default);
app.use('/api/v1/products', _products2.default);
app.use('/api/v1/categories', _categories2.default);
app.use('/api/v1/auth', _auth2.default);
app.use('/api/v1/users', _users2.default);
app.use('/api/v1/incidents', _incidents2.default);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log('Listening on Port ' + port);
});

exports.default = app;