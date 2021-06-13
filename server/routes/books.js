var express = require('express');
var router = express.Router();
var Book = require('../models/book')
var Genre = require('../models/genre')
var UserBook = require('../models/userBook')
var Review = require('../models/review')
//Test books routing
router.get('/', function(req, res, next) {
  res.status(200).send('Books routing');
});

// ADD BOOK
router.post('/add', async function(req, res, next) {
  let book_check = await Book.findOne({book_name: req.body.book_name, book_author: req.body.book_author});
  if (book_check) return res.status(400).send("This book is already in database");
  var book = new Book({
    book_name: req.body.book_name,
    book_author: req.body.book_author,
    book_description: req.body.book_description,
    book_released: req.body.book_released,
    book_genre: req.body.book_genre
  })
  try {
    await book.save()
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error)
  }
});

// UPDATE BOOK
router.patch('/update', async function(req, res, next) {
  let book_check = await Book.findOne({_id: req.body.book_id});
  if (book_check){
    try {
    if(req.body.book_name){
      book_check.book_name = req.body.book_name;
    }
    if(req.body.book_author){
      book_check.book_author = req.body.book_author;
    }
    if(req.body.book_description){
      book_check.book_description = req.body.book_description;
    }
    if(req.body.book_released){
      book_check.book_released = req.body.book_released;
    }
    if(req.body.book_genre){
      let genre_check = await Genre.findOne({_id: req.body.book_genre});
      if(genre_check)
        book_check.book_genre = req.body.book_genre;
      else
        res.status(400).send("This genre doesn't exist in database")
    }
      await book_check.save()
      res.status(200).send(book_check);
    } catch (error) {
      res.status(400).send(error)
    }
  } else {
    return res.status(400).send("This book doesn't exist in database");
  }
});

// DELETE BOOK
router.delete('/delete', async function(req, res, next) {
  let user_book_check = await UserBook.deleteMany({book_id: req.body.book_id});
  let book_check = await Book.deleteOne({_id: req.body.book_id});
  if (book_check.deletedCount == 1){
    return res.status(200).send("Book deleted") 
  } else {
    res.status(400).send("Bad data")
  }
});

async function calculate_rating(json_table){
  var table = []
  for (var index in json_table){
    let reviews = await Review.find({book_id: json_table[index]._id});
    var book = {
      _id: json_table[index]._id,
      book_name: json_table[index].book_name,
      book_author: json_table[index].book_author,
      book_released: json_table[index].book_released,
      book_description: json_table[index].book_description,
      book_genre: json_table[index].book_genre
    }
    var rating = 0, ratings = 0;
    if(reviews.length > 0){
      for(var rev in reviews){
        rating += reviews[rev].review_rating;
        ratings++;
      }
      rating = Math.round(rating / ratings);
    }
    book.book_rating = rating;
    table.push(book)
  }
  return table
}

// LIST BOOKS
router.get('/list', async function(req, res, next) {
  params= {};
  if(req.query.author)
    params.book_author = { "$regex": req.query.author, "$options": "i" };
  if(req.query.genre){
    let gen = await Genre.findOne({name: { "$regex": req.query.genre, "$options": "i" }})
    params.book_genre = gen._id;
  }
  if(req.query.name)
    params.book_name = { "$regex": req.query.name, "$options": "i" };
  if(req.query.release_date)
    params.book_released = req.query.release_date;
  
  let all = await Book.find(params)
  var ratedBooks = await calculate_rating(all)
  if(req.query.rating)
    for(var b in ratedBooks){
      if(ratedBooks[b].book_rating != req.query.rating){
        ratedBooks.splice(b, 1)
      }
    }
  res.status(200).send(ratedBooks);
});

//GET BOOK
router.get('/book', async function(req, res, next) {
  let book_check = await Book.findById(req.query.id);
  if(book_check){
    var ratedBook = await calculate_rating([book_check])
    res.status(200).send(ratedBook[0])
  } else {
    res.status(400).send("This book doesn't exist in database")
  }
});

module.exports = router;
