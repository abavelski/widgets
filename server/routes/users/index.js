var errors = require('../../errors'),
  User = require('../../db/models/user'),
  Transaction = require('../../db/models/transaction'),
  config = require('../../config'),
  stockInfo = require('../../api/finance/stockInfo');

module.exports = function(router) {

//login
router.route('/api/login').post(function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json(401, {error: errors.loginFailed });
    return;
  }

  User.findOne({'login': req.body.username}).exec().then(function(user){
      if (user && user.checkPassword(req.body.password)) {
        res.json({ token: user.getToken(), user: user.prepareForTransfer() });
      } else {
        res.json(401,{error: errors.loginFailed });
      }      
  },  function(err) {
      res.json(401,{error: errors.loginFailed });
  });
});

//register new user
router.route('/api/register').post(function(req, res){
  var user = new User({
    login : req.body.email,
    password : req.body.password,
    custodyAccounts : [config.defaultCustody],
    cashAccounts : [config.defaultCashAccount]
  });
  user.save(function(err){
    if (err) {
      res.json(500, {error: errors.saveUserFailed});
    } else {      
      res.json(201);
    }
  });
});

//add new custody
router.route('/auth/custody').post(function(req, res){
  if (req.body.name) {
    User.addCustody(req.user.id, {name : req.body.name }, function(err, custody){
      if (err) {
        res.json(500, {error : errors.saveCustodyFailed});
      } else {
        res.json(201, custody);
      }
    });
  } else {
    res.json(503, {error : errors.saveCustodyFailed});
  }
});

//add new cash account
router.route('/auth/cash-account').post(function(req, res){
  if (!req.body.name || !req.body.currency) {
    res.json(503, {error : errors.saveCashAccountFailed});
    return;
  } 
  User.addCashAccount(req.user.id, { 
    name : req.body.name, 
    currency : req.body.currency, 
    balance : 0 
  }, function(err, cashAccount){
      if (err) {
        res.json(500, {error : errors.saveCashAccountFailed});
      } else {
        res.json(201, cashAccount);
      }
    });
});


router.route('/auth/order').post(function(req, res){
  if (!req.user.id) {
    res.status(401).end();
    return;
  }
  var order = req.body;
    
  User.findById(req.user.id).exec().then(function(user){
    var cashAccount = user.getCashAccountById(order.cashAccountId);
    var custodyAccount = user.getCustodyAccountById(order.custodyAccountId);
    
    var updateUser = function(transaction) {
        if (transaction.type=='buy') {
          cashAccount.balance -= transaction.amount*transaction.price - transaction.commission;
        } else {
          cashAccount.balance += transaction.amount*transaction.price - transaction.commission;
        }

        var holding = custodyAccount.getHoldingBySymbol(transaction.symbol);
        if (holding && transaction.type == 'buy') {
          holding.amount += transaction.amount;
        } else if (holding && transactio.type == 'sell') {
          holding.amount -=transaction.amount;
        } else {
          holding = {
            amount : transaction.amount;
            symbol : transaction.symbol;
            avgPurchasePrice : transaction.price;
          }
          custodyAccount.holdings.push(holding);
        }
        user.save(function(err){
          if (err) {
            res.send(500).end();
            return;
          } else {
            res.send(201).end();
            return;
          }
        });
    };

    var createOrder = function(stocks) {
      var transaction = new Transaction({
        custodyId : custodyAccount._id,
        cashAccountId : cashAccount._id,
        symbol : order.symbol,
        type : order.type,
        amount : order.amount,
        price : type=='buy'?stocks[0].ask*order.amount:stocks[0].bid*amount,
        commission : 29,
        date : new Date()
      });
      transaction.save(function(err){
        if (err) {
          res.send(500).end();
          return;
        }
        updateUser(transaction);
      });
    };

    stockInfo.forSymbols([order.symbol]).withFields(['ask', 'bid'])
        .getStocks(createOrder);
  
  },
  function(err) {
    res.status(401).end();
    return;
  });



});



};