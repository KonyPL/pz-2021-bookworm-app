var express = require('express');
var router = express.Router();
var Book = require('../models/book')
var Genre = require('../models/genre')
var UserBook = require('../models/userBook')
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

// LIST BOOKS
router.get('/list', async function(req, res, next) {
  let all = await Book.find()
  res.status(200).send(all);
});

//GET BOOK
router.get('/book', async function(req, res, next) {
  let book_check = await Book.findOne({_id: req.query.id});
  if(book_check){
    res.status(200).send(book_check)
  } else {
    res.status(400).send("This book doesn't exist in database")
  }
});

module.exports = router;
