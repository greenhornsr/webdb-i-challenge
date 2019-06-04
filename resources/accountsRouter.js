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
    db.add(newaccount)
    .then(account => {
        res.status(201).json({success: true, message: `New account for ${newaccount.name} has been created!`, account})
    })
    .catch(err => {
        res.status(500).json({success: false, message: 'internal error', err})
    })
})

router.put('/:id', validateAccountID, (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    db.update(id, changes)
    .then(updated => {
        if(updated){
            res.status(200).json({ success: true, message: `Changes to account with id: ${id} completed successfully!`, changes })
        }else{
            res.status(404).json({ success: false, message: 'no account found to update' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server issues...sorry!', err })
    })
});

router.delete('/:id', validateAccountID, (req, res, next) => {
    const accountfound = req.account
    const {id} = req.params
    db.remove(id)
    .then(deleted => {
        if(deleted) {
            // res.status(204).end()
            res.status(204).json({ success: true, message: `Deleted ${accountfound.name}!`, accountfound })
        } else {
            res.status(404).json({ success: false, message: "The account with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ success: false, message: "The action could not be removed", err })
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

function validateAccountID(req, res, next) {
        // console.log(req.params)
        db.find(req.params.id)
        .then(account => {
            if(account){ 
            req.account = account
            next()
            }else{
                res.status(400).json({ message: 'Invalid account id!' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'unknown server error validating id', err })
        })
    } 

module.exports = router; 