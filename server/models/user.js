var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    user_name: {type: String, required: false, maxlength: 50, unique: false},
    user_surname: {type: String, required: false, maxlength: 50, unique: false},
    user_login: {type: String, required: true, maxlength: 50, unique: true},
    user_password: {type: String, required: true, maxlength: 50},
    birth_date: {type: Date, required: false},
    user_role: {type: String, enum: ['User', 'Moderator', 'Administrator'], required: true},
    finished_books: {type: Number, required: true, default: 0, min: 0},
    planned_books: {type: Number, required: true, default: 0, min: 0},
    current_books: {type: Number, required: true, default: 0, min: 0}
  }
);

//Export model
module.exports = mongoose.model('User', UserSchema);
