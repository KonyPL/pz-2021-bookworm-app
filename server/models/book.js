var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    book_name: {type: String, required: true},
    book_author: {type: String, required: true},
    book_released: {type: Date, required: false},
    book_description: {type: String, required: false},
    book_genre: {type: Schema.Types.ObjectId, ref: 'Genre', required: false}
  }
);

//Export model
module.exports = mongoose.model('Book', bookSchema);
