var express = require('express');
var router = express.Router();
var Genre = require('../models/genre')

//Test genres routing
router.get('/', function(req, res, next) {
  res.status(200).send('Genres routing');
});

// ADD Genre
router.post('/add', async function(req, res, next) {
  let genre_check = await Genre.findOne({name: req.body.name});
  if (genre_check) return res.status(400).send("This genre already exists in database");
  var genre = new Genre({
    name: req.body.name,
    description: req.body.description
  })
  try {
    await genre.save()
    res.status(201).send(genre);
  } catch (error) {
    res.status(400).send(error)
  }
});

// UPDATE GENRE
router.patch('/update', async function(req, res, next) {
  let genre_check = await Genre.findOne({_id: req.body.genre_id});
  if (genre_check){
    if(req.body.name){
      genre_check.name = req.body.name;
    }
    if(req.body.description){
      genre_check.description = req.body.description;
    }
    try {
      await genre_check.save()
      res.status(200).send(genre_check);
    } catch (error) {
      res.status(400).send(error)
    }
  } else {
    return res.status(400).send("This genre doesn't exist in database");
  }
});

// DELETE GENRE
router.delete('/delete', async function(req, res, next) {
  let genre_check = await Genre.deleteOne({ _id: req.body.genre_id});
  if (genre_check.deletedCount == 1){
    return res.status(200).send("Genre deleted") 
  } else {
    res.status(400).send("Bad data")
  }
});

// LIST GENRES
router.get('/list', async function(req, res, next) {
  let all = await Genre.find()
  res.status(200).send(all);
});

//GET GENRE
router.get('/genre', async function(req, res, next) {
  let genre_check = await Genre.findOne({_id: req.query.id});
  if(genre_check){
    res.status(200).send(genre_check)
  } else {
    res.status(400).send("This genre doesn't exist in database")
  }
});

module.exports = router;
