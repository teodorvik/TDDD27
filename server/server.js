const express = require('express');
const path = require('path');

const db = require('./db');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);

const port = 3000;
const server = express();

// const birds = require('./birds');

server.use(
    webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    })
);

// server.use('/birds', birds);

server.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`\nServer running on http://localhost:${port}\n`);
    }
});

server.get(/\//, function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});