const express = require('express');
const accountsRouter = require('./resources/accountsRouter');

const server = express();

server.use('/accounts', accountsRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Greetings</h1>`)
})

// middleware
function logger(req, res, next) {
    console.log(`${req.method} request to route ${req.url} at [${new Date().toISOString()}]`);
    next();
}


module.exports = server;