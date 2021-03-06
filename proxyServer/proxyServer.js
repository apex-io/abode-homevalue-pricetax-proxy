require('../../abode-homevalue-pricetax/server/server');
require('../../abode-similar-homes-monthly-cost-neighborhood-facts/server/index');
require('../../abode-summary-contacts/server/index');
require('../../carousel-commute-schools/server/index');
const { createProxyMiddleware } = require('http-proxy-middleware');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const port = 4444;

app.use(morgan('dev'));

app.use(bodyParser({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../public/')));

app.use('/exampleHomeSummary/', createProxyMiddleware({ target: 'http://localhost:3333/', changeOrigin: true }));

app.use('/properties', createProxyMiddleware({ target: 'http://localhost:5000/', changeOrigin: true }));

app.use('/api/neighborhoods', createProxyMiddleware({ target: 'http://localhost:3001/', changeOrigin: true }));

app.use('/api/houses', createProxyMiddleware({ target: 'http://localhost:3001/', changeOrigin: true }));

app.use('/api/gethomepictures', createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true }));


app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
