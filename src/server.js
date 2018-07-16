const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


// load env
dotenv.load({
  path: path.resolve(__dirname, '../.env'),
});


const app = express();

if ( process.env.NODE_ENV !== 'production' ) {
  const compiler = webpack(webpackConfig('development'));
  app.use( webpackDevMiddleware(compiler) );
  app.use( webpackHotMiddleware(compiler) );
}
else {
  app.use( express.static('dist') );
}
app.use( express.static('public') );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.get('/api-test', (req, res) => {
  res.json({
    success: true,
    query: req.query,
  });
});

app.post('/api-test', (req, res) => {
  res.json({
    success: true,
    body: req.body,
  });
});

app.get('*', ( req, res ) => {
  res.sendFile( path.join(__dirname, '../dist/index.html') );
});

app.listen(process.env.PORT || 3000, () => {
  console.log('app listening on port 3000'); // eslint-disable-line no-console
});
