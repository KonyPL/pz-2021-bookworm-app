var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserBookSchema = new Schema(
  {
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    book_id: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    book_status: {type: String, enum: ['Finished', 'Ongoing', 'Planned'], required: true},
    book_progress: {type: Number, default: 0, min: 0, max: 1}
  }
);

//Export model
module.exports = mongoose.model('UserBook', UserBookSchema);
