var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Book = require('../models/book')
var UserBook = require('../models/userBook')

/* GET user books listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('User books routing');
});

// ADD BOOK TO USER LIBRARY
router.post('/add', async function(req, res, next) {
  let user_check = await User.findOne({_id: req.body.user_id, user_password: req.body.user_password});
  if (user_check){
    let book_check = await Book.findOne({_id: req.body.book_id});
    if(book_check){
      let lib_check = await UserBook.findOne({user_id: req.body.user_id, book_id: req.body.book_id});
      if(lib_check) return res.status(405).send("This user has this book in his library already");
      var userBook = new UserBook({
        user_id: req.body.user_id,
        book_id: req.body.book_id,
        book_status: req.body.book_status,
        book_progress: req.body.book_progress
      })
      try {
        await userBook.save()
        res.status(201).send(userBook);
      } catch (error) {
        res.status(400).send(error)
      }
    } else {
      res.status(400).send("Book doesn't exist");
    }
  } else {
    res.status(400).send("User doesn't exist");
  }
  
});

// UPDATE BOOK
router.patch('/update', async function(req, res, next) {
  let user_check = await User.findOne({_id: req.body.user_id, user_password: req.body.user_password});
  if (user_check){
    let lib_check = await UserBook.findOne({_id: req.body.user_book_id, user_id: req.body.user_id});
    if(lib_check){
      if(req.body.book_status){
        lib_check.book_status = req.body.book_status;
      }
      if(req.body.book_progress){
        lib_check.book_progress = req.body.book_progress;
      }
      try {
        await lib_check.save()
        res.status(200).send(lib_check);
      } catch (error) {
        res.status(400).send(error)
      }
    } else {
      res.status(400).send("This entry in user's library doesn't exist");
    }
  } else {
    return res.status(400).send("User doesn't exist");
  }
});

// DELETE BOOK
router.delete('/delete', async function(req, res, next) {
  let user_check = await User.findOne({_id: req.body.user_id, user_password: req.body.user_password});
  if (user_check){
    let lib_check = await UserBook.deleteOne({_id: req.body.user_book_id, user_id: req.body.user_id});
    if(lib_check.deletedCount == 1){
      return res.status(200).send("Book deleted from user's library") 
    } else {
      return res.status(400).send("Book is not in user's library");
    }
  } else {
    return res.status(400).send("User doesn't exist");
  }
});

async function readable_book(json_table){
  var table = []
  for (var index in json_table){
    let user_check = await User.findOne({_id: json_table[index].user_id});
    table.push({
      'user_login': user_check.user_login,
      'user_book_id': json_table[index]._id,
      'book_id': json_table[index].book_id, 
      'book_status': json_table[index].book_status, 
      'book_progress': json_table[index].book_progress})
  }
  return table
}

// LIST ALL BOOKS
router.get('/list', async function(req, res, next) {
  
  if(req.query.book_id && req.query.user_login){
    let user_check = await User.findOne({user_login: req.query.user_login});
    let all = await UserBook.find({book_id: req.query.book_id, user_id: user_check._id});
    let lib = await readable_book(all)
    res.status(200).send(lib);
  } else if(req.query.book_id){
    let all = await UserBook.find({book_id: req.query.book_id});
    let lib = await readable_book(all)
    res.status(200).send(lib);
  } else if(req.query.user_login){
    let user_check = await User.findOne({user_login: req.query.user_login});
    if(user_check){
      let all = await UserBook.find({user_id: user_check._id});
      let lib = await readable_book(all)
      res.status(200).send(lib);
    } else {
      res.status(400).send("User doesn't exist");
    }
  } else {
    let all = await UserBook.find();
    let lib = await readable_book(all)
    res.status(200).send(lib);
  }
});

//GET BOOK info
router.get('/book', async function(req, res, next) {
  let book_check = await UserBook.findOne({_id: req.query.id});
  if(book_check){
    let book = await readable_book([book_check])
    res.status(200).send(book[0])
  } else {
    res.status(400).send("Book doesn't exist in user's library")
  }
});

module.exports = router;
