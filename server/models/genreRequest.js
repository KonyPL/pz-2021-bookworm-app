var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreRequestSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: false},
    approved: {type: Boolean, default: false},
    processed_by: {type: Schema.Types.ObjectId, ref: 'User', deafult: null},
  }
);

//Export model
module.exports = mongoose.model('GenreRequest', GenreRequestSchema);
