var express = require('express');
var router = express.Router();
var User = require('../models/user')
var UserBook = require('../models/userBook')
var Book = require('../models/book')
var Genre = require('../models/genre')
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('Users routing');
});

// ADD USER
router.post('/add', async function(req, res, next) {
  if (req.body.user_login == "User deleted") return res.status(403).send("Cannot set this username");
  let user_check = await User.findOne({user_login: req.body.user_login});
  if (user_check) return res.status(400).send("Username taken");
  try {
    const hashed_pass = await bcrypt.hash(req.body.user_password, 10)
    var user = new User({
      user_login: req.body.user_login,
      user_password: hashed_pass,
      user_role: "User"
    })
    await user.save()
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
});

// UPDATE USER
router.patch('/update', async function(req, res, next) {
  let user = await User.findById(req.body._id);
  const verify = await bcrypt.compare(req.body.user_password, user.user_password)
  if (verify){
    try {
      if(req.body.new_password){
        const hashed_pass = await bcrypt.hash(req.body.new_password, 10)
        user.user_password = hashed_pass;
      }
      if(req.body.user_name){
        user.user_name = req.body.user_name;
      }
      if(req.body.user_surname){
        user.user_surname = req.body.user_surname;
      }
      if(req.body.birth_date){
        user.birth_date = req.body.birth_date;
      }
      await user.save()
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error)
    }
  } else {
    return res.status(400).send("User doesn't exist");
  }
});

// LOGIN USER
router.post('/login', async function(req, res, next) {
  let user_check = await User.findOne({user_login: req.body.user_login});
  if(user_check){
    const verify = await bcrypt.compare(req.body.user_password, user_check.user_password)
    if (verify){
      return res.status(200).send(user_check)
    } else {
      res.status(400).send("User doesn't exist")
    }
  } else {
    res.status(400).send("User doesn't exist")
  }
});

// LOGOUT USER
router.post('/logout', async function(req, res, next) {
  res.status(200).send('Loging out');
});

// DELETE USER
router.delete('/delete', async function(req, res, next) {
  let user = await User.findById(req.body._id);
  const verify = await bcrypt.compare(req.body.user_password, user.user_password)
  if(verify){
    let user_check = await User.deleteOne({ _id: req.body._id});
    if (user_check.deletedCount == 1){
      return res.status(200).send("User deleted") 
    } else {
      res.status(400).send("Bad data")
    }
  } else {
    res.status(400).send("Bad username or password")
  }
});

function new_Table(json_table){
  var table = []
  for (var index in json_table){
    table.push({
      'user_login': json_table[index].user_login, 
      'finished_books': json_table[index].finished_books, 
      'planned_books': json_table[index].planned_books, 
      'current_books': json_table[index].current_books})
  }
  return table
}

// LIST USERS
router.get('/list', async function(req, res, next) {
  params= {};
  if(req.query.user_login)
    params.user_login = { "$regex": req.query.user_login, "$options": "i" };
  if(req.query.user_name)
    params.user_name = { "$regex": req.query.user_name, "$options": "i" };
  if(req.query.user_surname)
    params.user_surname = { "$regex": req.query.user_surname, "$options": "i" };
  if(req.query.user_role)
    params.user_role = { "$regex": req.query.user_role, "$options": "i" };
  
  let all = await User.find(params)
  let tabela = await new_Table(all)
  res.status(200).send(tabela);
});

async function calc_fav_genre(user){
  let genres = [];
  let user_books = await UserBook.find({user_id: user._id, book_status: 'Finished'})
  for(var i = 0; i < user_books.length; i++){
    let book = await Book.findOne({_id: user_books[i].book_id})
    if(book){
      let genre = await Genre.findOne({_id: book.book_genre})
      if(genre){
        var exists = false;
        for(var j = 0; j < genres.length; j++){
          if(genres[j][0] == genre._id){
            exists = true;
            genres[j][1]+=1;
            break;
          }
        }
        if(!exists){
          genres.push([genre._id, 1])
        }
      }
    } 
  }
  var favourite;
  if(genres.length > 0){
    var fav = [genres[0][0], genres[0][1]]
    for(var i = 1; i < genres.length; i++){
      if(genres[i][1]>fav[1]){
        fav = [genres[i][0], genres[i][1]]
      }
    }
    favourite = await Genre.findOne({_id: fav[0]})
  } else {
    favourite = "None"
  }

  return favourite.name
}

async function calc_fav_author(user){
  let authors = [];
  let user_books = await UserBook.find({user_id: user._id, book_status: 'Finished'})
  for(var i = 0; i < user_books.length; i++){
    let book = await Book.findOne({_id: user_books[i].book_id})
    if(book){
      var exists = false;
      for(var j = 0; j < authors.length; j++){
        if(authors[j][0] == book.book_author){
          exists = true;
          authors[j][1]+=1;
          break;
        }
      }
      if(!exists){
        authors.push([book.book_author, 1])
      }
    
    } 
  }
  var favourite;
  if(authors.length > 0){
    var fav = [authors[0][0], authors[0][1]]
    for(var i = 1; i < authors.length; i++){
      if(authors[i][1]>fav[1]){
        fav = [authors[i][0], authors[i][1]]
      }
    }
    favourite = fav[0]
  } else {
    favourite = "None"
  }

  return favourite
}

//GET USER
router.get('/user', async function(req, res, next) {
  let user_check = await User.findOne({user_login: req.query.login});
  if(user_check){
    let finished_books = await UserBook.count({user_id: user_check._id, book_status: 'Finished'})
    let planned_books = await UserBook.count({user_id: user_check._id, book_status: 'Planned'})
    let ongoing_books = await UserBook.count({user_id: user_check._id, book_status: 'Ongoing'})
    let favourite_genre = await calc_fav_genre(user_check)
    let favourite_author = await calc_fav_author(user_check);
    
    res.status(200).send({
      'user_login': user_check.user_login,
      'user_name': user_check.user_name,
      'user_surname': user_check.user_surname,
      'birth_date': user_check.birth_date,
      'user_role': user_check.user_role,
      'finished_books': finished_books,
      'planned_books': planned_books, 
      'ongoing_books': ongoing_books,
      'favourite_genre': favourite_genre,
      'favourite_author': favourite_author})
  } else {
    res.status(400).send("User doesn't exist")
  }
});

//PROMOTE USER
router.patch('/promote', async function(req, res, next) {
  let promotor_check = await User.findOne({_id: req.body.promotor_id});
  const verify = await bcrypt.compare(req.body.promotor_password, promotor_check.user_password)
  if(verify){
    if(promotor_check.user_role != 'User'){
      let user_check = await User.findOne({user_login: req.body.promotee});
      if(user_check){
        if(req.body.new_role == 'User' || req.body.new_role == 'Moderator' || req.body.new_role == 'Administrator'){
          if(req.body.new_role == 'Administrator'){
            if(promotor_check.user_role == 'Administrator'){
              user_check.user_role = 'Administrator'
              try {
                await user_check.save()
                res.status(200).send('Promotee was promoted to Administrator');
              } catch (error) {
                res.status(400).send(error)
              }
            } else {
              res.status(403).send("Promotor does not have role high enough to promote")
            }
          } else if(req.body.new_role == 'Moderator'){
            user_check.user_role = 'Moderator'
              try {
                await user_check.save()
                res.status(200).send('Promotee was promoted to Moderator');
              } catch (error) {
                res.status(400).send(error)
              }
          }
        } else {
          res.status(400).send("Wrong role name")
        }
      } else {
        res.status(400).send("Promotee does not exist")
      }
    } else {
      res.status(403).send("Promotor does not have rights to promote")
    }
  } else {
    res.status(401).send("Wrong promotor credentials or promotor does not exist")
  }
});

//DELETE USER BY ADMIN
router.delete('/authority-delete', async function(req, res, next) {
  let auth_check = await User.findOne({_id: req.body.auth_id});
  const verify = await bcrypt.compare(req.body.auth_password, auth_check.user_password)
  if(verify){
    if(auth_check.user_role != 'User'){
      let user_check = await User.deleteOne({ user_login: req.body.user_login});
      if (user_check.deletedCount == 1){
        return res.status(200).send("User deleted") 
      } else {
        res.status(400).send("Bad data")
      }
    } else {
      res.status(403).send("Authority does not have rights to delete user")
    }
  } else {
    res.status(401).send("Wrong authority credentials or authority does not exist")
  }
});

function makeTempPasswd(length) {
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
 }
 return result.join('');
}

//RESET PASSWORD For User
router.patch('/authority-reset-pass', async function(req, res, next) {
  let auth_check = await User.findOne({_id: req.body.auth_id});
  const verify = await bcrypt.compare(req.body.auth_password, auth_check.user_password)
  if(verify){
    if(auth_check.user_role != 'User'){
      let user_check = await User.findOne({ user_login: req.body.user_login});
      if (user_check){
        var passwd = makeTempPasswd(8);
        const hashed_pass = await bcrypt.hash(passwd, 10)
        user_check.user_password = hashed_pass;
        try {
          await user_check.save()
          res.status(200).send('Successfully reseted password to: '+passwd);
        } catch (error) {
          res.status(400).send(error)
        }
      } else {
        res.status(400).send("Bad data")
      }
    } else {
      res.status(403).send("Authority does not have rights to reset password for user")
    }
  } else {
    res.status(401).send("Wrong authority credentials or authority does not exist")
  }
});

module.exports = router;
