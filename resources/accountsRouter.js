const express = require('express');
const db = require('../data/accounts-model');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    db.find()
    .then(accounts => {
        res.status(200).json({success: true, accounts})
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({success: false, message: 'no accounts found', err })
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(account => {
        res.status(200).json({success: true, account})
    })
    .catch(err => {
        res.status(400).json({success: false, message: 'no account found', err })
    })
})

router.post('/', validateAccount, (req, res) => {
    const newaccount = req.body;
    console.log(newaccount)
    db.add(newaccount)
    .then(account => {
        res.status(201).json({success: true, message: `New account for ${newaccount.name} has been created!`, account})
    })
    .catch(err => {
        res.status(500).json({success: false, message: 'internal error', err})
    })
})

// middleware
function validateAccount(req, res, next) {
    if (!req.body.name){
        res.status(400).json({message: 'A name was not provided.  name field is required!'})
    }else if(!req.body.budget){
        res.status(400).json({message: 'A budget was not provided.  budget field is required!'})
    }else{
        next();
    }
}

module.exports = router; 