var NavView = function() {
  this.clear();
  this.display();
};

NavView.prototype = {
  clear: function() {

    var tranSpace = document.getElementById( "trans-space" );
    var warnSpace = document.getElementById( "warn-space" );
    var transactionSpace = document.getElementById( "transaction-space" );

    tranSpace.innerText = "";
    warnSpace.innerText = "";
    transactionSpace.innerText = "";

  },

  display: function() {

    var navSpace = document.getElementById( "nav-space" );

    var transactions = document.createElement( "h5" );
    transactions.innerText = "transactions";
    transactions.onclick = function() {
      console.log( "trans" );
    };

    var totals = document.createElement( "h5" );
    totals.innerText = "totals";
    totals.onclick = function() {
      console.log( "totals" );
    };

    var graphs = document.createElement( "h5" );
    graphs.innerText = "graphs";
    graphs.onclick = function() {
      console.log( "graphs" );
    };

    navSpace.appendChile( transactions );
    navSpace.appendChile( totals );
    navSpace.appendChile( graphs );
  },
};

module.exports = NavView;