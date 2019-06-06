// implement your API here
const express = require('express');
const db = require('./data/db.js');


const server = express();

server.listen(4232, () => {
    console.log('Hello world on localhost:4232')
})

//CREATE
server.post('api/users', (req, res) => {
    const {name, bio} = req.body;

    if(!name) {
        res.status(400)({ 
            errorMessage: "Please provide name and bio for the user."
        })
    }
    db.add({name, bio})
      .then(users => {
          res.status(201).json({ success: true, users});
      })
      .catch(err=> {
          res.status(500).json({
              success: false,
              error: "There was an error while saving the user to the database."
          });
      })
})

//READ
server.get('api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        .catch(err => {
            res.status(500).json({
                success: false, 
                error: "The users info could not be retrieved."
            })
        })
        })
})

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json({
            success: true,
            user,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'The user with the specified ID does not exist..',
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "The user information could not be retrieved.",
        });
      });
   });


   //DELETE
   server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
   
    db.remove(id)
      .then(deleted => {
        if (deleted) {
          res.status(204).end();
        } else {
          res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist.",
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "The user could not be removed",
        });
      });
   });