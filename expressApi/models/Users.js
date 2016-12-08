var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  books: { read: [{ type: String , ref: 'Books'}],
           reading: [ { type: String , ref: 'Books'} ],
           notRead: [ { type: String , ref: 'Books'} ]
         }
});
module.exports = mongoose.model('Users', UserSchema);

// Used to populate db for testing purpose
// db.users.insert({username: "bob", password: "mdp", books: { read: ["9783319291048", "9781626746183"], reading: ["9781435895317", "9789043125574"], notRead: ["9781574091274", "9781785889691"] }})
