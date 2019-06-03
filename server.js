const express = require('express');
const db = require('./data/accounts-model');

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h1>Greetings</h1>`)
})

server.get('/accounts', (req, res) => {
    db.find()
    .then(accounts => {
        res.status(200).json({success: true, accounts})
    })
    .catch(err => {
        res.status(400).json({success: false, message: 'no accounts found', err })
    })
})


module.exports = server;