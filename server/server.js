// Includes
const express              = require('express');
const path                 = require('path');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser           = require('body-parser')

// Settings
const config   = require('../webpack.config');
const compiler = webpack(config);
const port     = 3000;

// Setup server
const server = express();
server.use(
    webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    })
);

// Setup database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wyrv');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Database connected");
});

// Setup API

const routes = require('./routes');
server.use(bodyParser.json({ limit: '20mb' }));
server.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
server.use('/api', routes);

// Start server
server.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`\nServer running on http://localhost:${port}\n`);
    }
});

// Frontend route
server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});