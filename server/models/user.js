var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    user_name: {type: String, required: false, maxlength: 50, unique: false},
    user_surname: {type: String, required: false, maxlength: 50, unique: false},
    user_login: {type: String, required: true, maxlength: 50, unique: true},
    user_password: {type: String, required: true, maxlength: 60},
    birth_date: {type: Date, required: false},
    user_role: {type: String, enum: ['User', 'Moderator', 'Administrator'], required: true}
  }
);

//Export model
module.exports = mongoose.model('User', UserSchema);
