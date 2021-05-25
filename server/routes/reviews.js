var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Book = require('../models/book')
var Review = require('../models/review')

/* GET reviews listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('Reviews routing');
});

// ADD REVIEW
router.post('/add', async function(req, res, next) {
  let user_check = await User.findOne({_id: req.body.user_id});
  if (user_check){
    let book_check = await Book.findOne({_id: req.body.book_id});
    if(book_check){
      let review_check = await Review.findOne({user_id: req.body.user_id, book_id: req.body.book_id});
      if(review_check) return res.status(405).send("This user has reviewed this book already");
      var review = new Review({
        user_id: req.body.user_id,
        book_id: req.body.book_id,
        review_rating: req.body.review_rating,
        review_content: req.body.review_content
      })
      try {
        await review.save()
        res.status(201).send(review);
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

// UPDATE REVIEW
router.patch('/update', async function(req, res, next) {
  try{
  let user_check = await User.findOne({_id: req.body.user_id});
  if (user_check){
    let review_check = await Review.findOne({_id: req.body.review_id, user_id: req.body.user_id});
    if(review_check){
      if(req.body.review_rating){
        review_check.review_rating = req.body.review_rating;
      }
      if(req.body.review_content){
        review_check.review_content = req.body.review_content;
      }
      try {
        await review_check.save()
        res.status(200).send(review_check);
      } catch (error) {
        res.status(400).send(error)
      }
    } else {
      return res.status(400).send("Review doesn't exist");
    }
  } else {
    return res.status(400).send("User doesn't exist");
  }
  }catch (error){
    return res.status(400).send("Bad data");
  }
});

// DELETE REVIEW
router.delete('/delete', async function(req, res, next) {
  let user_check = await User.findOne({_id: req.body.user_id});
  if (user_check){
    let review_check = await Review.deleteOne({_id: req.body.review_id, user_id: req.body.user_id});
    if(review_check.deletedCount == 1){
      return res.status(200).send("Review deleted") 
    } else {
      return res.status(400).send("Review doesn't exist or doesn't belong to user");
    }
  } else {
    return res.status(400).send("User doesn't exist");
  }
});

// DELETE REVIEW by Admin
router.delete('/authority-delete', async function(req, res, next) {
  let auth_check = await User.findOne({_id: req.body.auth_id, user_password: req.body.auth_password});
  if(auth_check){
    if(auth_check.user_role != 'User'){
      let review_check = await Review.deleteOne({_id: req.body.review_id});
      if(review_check.deletedCount == 1){
        return res.status(200).send("Review deleted") 
      } else {
        return res.status(400).send("Review doesn't exist");
      }
    } else {
      res.status(403).send("Authority does not have rights to delete review")
    }
  } else {
    res.status(401).send("Wrong authority credentials or authority does not exist")
  }
});

async function readable_review(json_table){
  var table = []
  for (var index in json_table){
    let user_check = await User.findOne({_id: json_table[index].user_id});
    table.push({
      'user_login': user_check.user_login,
      'review_id': json_table[index]._id,
      'book_id': json_table[index].book_id, 
      'review_rating': json_table[index].review_rating, 
      'review_content': json_table[index].review_content})
  }
  return table
}

// LIST ALL REVIEWS with filters
router.get('/list', async function(req, res, next) {
  
  if(req.query.book_id && req.query.user_login){
    let user_check = await User.findOne({user_login: req.query.user_login});
    let all = await Review.find({book_id: req.query.book_id, user_id: user_check._id});
    let reviews = await readable_review(all)
    res.status(200).send(reviews);
  } else if(req.query.book_id){
    let all = await Review.find({book_id: req.query.book_id});
    let reviews = await readable_review(all)
    res.status(200).send(reviews);
  } else if(req.query.user_login){
    let user_check = await User.findOne({user_login: req.query.user_login});
    if(user_check){
      let all = await Review.find({user_id: user_check._id});
      let reviews = await readable_review(all)
      res.status(200).send(reviews);
    } else {
      res.status(400).send("User doesn't exist");
    }
    
  } else {
    let all = await Review.find();
    let reviews = await readable_review(all)
    res.status(200).send(reviews);
  }
});

//GET REVIEW
router.get('/review', async function(req, res, next) {
  let review_check = await Review.findOne({_id: req.query.id});
  if(review_check){
    let review = await readable_review([review_check])
    res.status(200).send(review[0])
  } else {
    res.status(400).send("Review doesn't exist")
  }
});



module.exports = router;
