var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
  ISBN: String,
  name: String,
  read: Boolean
});
module.exports = mongoose.model('Books', BookSchema);
