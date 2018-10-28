'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('./api/controllers/products');

var _products2 = _interopRequireDefault(_products);

var _sales = require('./api/controllers/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.json());
app.get('/api/v1/', function (req, res) {
  return res.status(200).json('Welcome');
});

// Load Product Routes
app.get('/api/v1/products', _products2.default.getAll);
app.get('/api/v1/products/:id', _products2.default.getOne);
app.post('/api/v1/products', _products2.default.create);
app.put('/api/v1/products/:id', _products2.default.update);
app.delete('/api/v1/products/:id', _products2.default.delete);

// Load Sales Routes
app.get('/api/v1/sales', _sales2.default.getAll);
app.get('/api/v1/sales/:id', _sales2.default.getOne);
app.post('/api/v1/sales', _sales2.default.create);

var port = process.env.port || 3000;
app.listen(port, function () {
  return console.log('Listening on Port ' + port);
});

exports.default = app;