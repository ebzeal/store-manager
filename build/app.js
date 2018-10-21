'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('./routes/products');

var _products2 = _interopRequireDefault(_products);

var _sales = require('./routes/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as Joi from 'joi';

// import routes
var app = (0, _express2.default)();

// load routes
app.use(_express2.default.json());
app.use('/api/v1/products', _products2.default);
app.use('/api/v1/sales', _sales2.default);
app.get('/', function (req, res) {
  return res.status(200).send('Welcome');
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  return console.log('Listening on port ' + port);
});
module.exports = app;