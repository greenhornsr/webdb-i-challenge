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

server.get('/accounts/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(account => {
        res.status(200).json({success: true, account})
    })
    .catch(err => {
        res.status(400).json({success: false, message: 'no account found', err })
    })
})


module.exports = server;