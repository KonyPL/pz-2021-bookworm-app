var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
  {
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    book_id: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    review_rating: {type: Number, default: 0, min: 0, max: 5, required: true},
    review_content: {type: String, required: false}
  }
);

//Export model
module.exports = mongoose.model('Review', ReviewSchema);
