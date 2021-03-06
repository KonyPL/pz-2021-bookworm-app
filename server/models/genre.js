var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: false},
  }
);

//Export model
module.exports = mongoose.model('Genre', GenreSchema);
