var mongoose = require('mongoose');


var transactionSchema = mongoose.Schema({
	custodyId : Schema.Types.ObjectId,
	cashAccountId : Schema.Types.ObjectId,
    symbol : String,
    type : String,
    amount : Number,
    price : Number,
    commission : Number,
    date : Date
  });


  module.exports= mongoose.model('Transaction', transactionSchema);
