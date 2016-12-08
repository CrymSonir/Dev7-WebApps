var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
  isbn13: String,
  name: String
});
module.exports = mongoose.model('Books', BookSchema);

// db.books.insert([{isbn13: "9783319291048", name: "Ethics in Computing"}, {isbn13: "9781626746183", name: "Bending steel"}, {isbn13: "9781435895317", name: "Introduction to genetics"}, {isbn13: "9789043125574", name: "Songs of a wayfarer"}, {isbn13: "9781574091274", name: "Confessions of a boatbuilder"}, {isbn13: "9781785889691", name: "Distributed Computing with Python"}])
