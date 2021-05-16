var express = require('express');
var router = express.Router();
var Genre = require('../models/genre')
var GenreReq = require('../models/genreRequest')
var User = require('../models/user')

//Test genres routing
router.get('/', function(req, res, next) {
  res.status(200).send('Genre requests routing');
});

// ADD Genre Request
router.post('/add', async function(req, res, next) {
  let genre_check = await Genre.findOne({name: req.body.name});
  if (genre_check) return res.status(400).send("This genre already exists in database");
  var genreReq = new GenreReq({
    name: req.body.name,
    description: req.body.description
  })
  try {
    await genreReq.save()
    res.status(201).send(genreReq);
  } catch (error) {
    res.status(400).send(error)
  }
});

// ACCEPT GENRE
router.patch('/accept', async function(req, res, next) {
  let genre_check = await GenreReq.findOne({_id: req.body.genre_request_id});
  let user_check = await User.findOne({_id: req.body.user_id, user_password: req.body.user_password});
  if(user_check){
    if(user_check.user_role != 'User'){
      if (genre_check){
        if(req.body.name){
          genre_check.name = req.body.name;
        }
        if(req.body.description){
          genre_check.description = req.body.description;
        }

        if(genre_check.processed_by != null){
          return res.status(400).send("This request is already processed");
        } else {
          genre_check.approved = true;
          genre_check.processed_by = user_check._id;
          var genre = new Genre({
            name: genre_check.name,
            description: genre_check.description
          })
        }

        try {
          await genre.save()
          await genre_check.save()
          res.status(200).send(genre_check);
        } catch (error) {
          res.status(400).send(error)
        }

      } else {
        return res.status(400).send("This request doesn't exist in database");
      }
    } else {
      res.status(403).send("User does not have rights to approve")
    }
  } else {
    res.status(401).send("Wrong user credentials or user does not exist")
  }
});

// REJECT GENRE
router.patch('/reject', async function(req, res, next) {
  let genre_check = await GenreReq.findOne({_id: req.body.genre_request_id});
  let user_check = await User.findOne({_id: req.body.user_id, user_password: req.body.user_password});
  if(user_check){
    if(user_check.user_role != 'User'){
      if (genre_check){
        if(genre_check.processed_by != null){
          return res.status(400).send("This request is already processed");
        } else {
        genre_check.approved = false;
        genre_check.processed_by = user_check._id;
        }
        try {
          await genre_check.save()
          res.status(200).send(genre_check);
        } catch (error) {
          res.status(400).send(error)
        }

      } else {
        return res.status(400).send("This request doesn't exist in database");
      }
    } else {
      res.status(403).send("User does not have rights to reject")
    }
  } else {
    res.status(401).send("Wrong user credentials or user does not exist")
  }
});

// DELETE GENRE REQUEST
router.delete('/delete', async function(req, res, next) {
  let user_check = await User.findOne({_id: req.body.user_id, user_password: req.body.user_password});
  if(user_check){
    if(user_check.user_role == 'Administrator'){
      let genre_check = await GenreReq.deleteOne({ _id: req.body.genre_request_id});
      if (genre_check.deletedCount == 1){
        return res.status(200).send("Genre request deleted") 
      } else {
        res.status(400).send("This request doesn't exist in database");
      }
    } else {
      res.status(403).send("User does not have rights to delete")
    }
  } else {
    res.status(401).send("Wrong user credentials or user does not exist")
  }
  
});

// DELETE ALL PROCESSED GENRE REQUEST
router.delete('/delete-processed', async function(req, res, next) {
  let user_check = await User.findOne({_id: req.body.user_id, user_password: req.body.user_password});
  if(user_check){
    if(user_check.user_role == 'Administrator'){
        let genre_check = await GenreReq.deleteMany({processed_by: { $ne: null }});
        if (genre_check.deletedCount >= 1){
          return res.status(200).send("All processed genre requests deleted") 
        } else {
          res.status(400).send("No processed requests in database");
        }
    } else {
      res.status(403).send("User does not have rights to delete")
    }
  } else {
    res.status(401).send("Wrong user credentials or user does not exist")
  }
});

// DELETE ALL REJECTED GENRE REQUEST
router.delete('/delete-rejected', async function(req, res, next) {
  let user_check = await User.findOne({_id: req.body.user_id, user_password: req.body.user_password});
  if(user_check){
    if(user_check.user_role == 'Administrator'){
      let genre_check = await GenreReq.deleteMany({processed_by: { $ne : null }, approved: false});
      if (genre_check.deletedCount == 1){
        return res.status(200).send("All rejected genre requests deleted") 
      } else {
        res.status(400).send("No rejected requests in database");
      }
    } else {
      res.status(403).send("User does not have rights to delete")
    }
  } else {
    res.status(401).send("Wrong user credentials or user does not exist")
  }
});

// LIST GENRE REQUESTS
router.get('/list', async function(req, res, next) {
  let all = await GenreReq.find()
  res.status(200).send(all);
});

//GET GENRE REQUEST
router.get('/request', async function(req, res, next) {
  let genre_check = await GenreReq.findOne({_id: req.query.id});
  if(genre_check){
    res.status(200).send(genre_check)
  } else {
    res.status(400).send("This genre doesn't exist in database")
  }
});

module.exports = router;
