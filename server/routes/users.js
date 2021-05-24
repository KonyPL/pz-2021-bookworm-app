var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('Users routing');
});

// ADD USER
router.post('/add', async function(req, res, next) {
  let user_check = await User.findOne({user_login: req.body.user_login});
  if (user_check) return res.status(400).send("Username taken");
  var user = new User({
    user_login: req.body.user_login,
    user_password: req.body.user_password,
    user_role: "User"
  })
  try {
    await user.save()
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error)
  }
});

// UPDATE USER
router.patch('/update', async function(req, res, next) {
  let user_check = await User.findOne({_id: req.body._id, user_password: req.body.user_password});
  if (user_check){
    //console.log(user_check)
    if(req.body.new_password){
      user_check.user_password = req.body.new_password;
    }
    if(req.body.user_name){
      user_check.user_name = req.body.user_name;
    }
    if(req.body.user_surname){
      user_check.user_surname = req.body.user_surname;
    }
    if(req.body.birth_date){
      user_check.birth_date = req.body.birth_date;
    }
    try {
      await user_check.save()
      res.status(200).send(user_check);
    } catch (error) {
      res.status(400).send(error)
    }
  } else {
    return res.status(400).send("User doesn't exist");
  }
});

// LOGIN USER
router.post('/login', async function(req, res, next) {
  let user_check = await User.findOne({user_login: req.body.user_login, user_password: req.body.user_password});
  if (user_check){
    return res.status(200).send(user_check) 
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
  let user_check = await User.deleteOne({ _id: req.body._id, user_password: req.body.user_password});
  if (user_check.deletedCount == 1){
    return res.status(200).send("User deleted") 
  } else {
    res.status(400).send("Bad data")
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
  let all = await User.find()
  let tabela = await new_Table(all)
  res.status(200).send(tabela);
});

//GET USER
router.get('/user', async function(req, res, next) {
  let user_check = await User.findOne({user_login: req.query.login});
  if(user_check){
    res.status(200).send({
      'user_login': user_check.user_login,
      'user_name': user_check.user_name,
      'user_surname': user_check.user_surname,
      'birth_date': user_check.birth_date,
      'user_role': user_check.user_role,
      'finished_books': user_check.finished_books,
      'planned_books': user_check.planned_books, 
      'current_books': user_check.current_books})
  } else {
    res.status(400).send("User doesn't exist")
  }
});

//PROMOTE USER
router.patch('/promote', async function(req, res, next) {
  let promotor_check = await User.findOne({_id: req.body.promotor_id, user_password: req.body.promotor_password});
  if(promotor_check){
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
  let auth_check = await User.findOne({_id: req.body.auth_id, user_password: req.body.auth_password});
  if(auth_check){
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
  let auth_check = await User.findOne({_id: req.body.auth_id, user_password: req.body.auth_password});
  if(auth_check){
    if(auth_check.user_role != 'User'){
      let user_check = await User.findOne({ user_login: req.body.user_login});
      if (user_check){
        var passwd = makeTempPasswd(8);
        user_check.user_password = passwd;
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
