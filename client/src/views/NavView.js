var TransView = require( './TransView' );

var NavView = function() {
  this.clear();
  this.display();
};

NavView.prototype = {
  clear: function() {

    var navSpace = document.getElementById( "nav-space" );
    var tranSpace = document.getElementById( "trans-space" );
    var warnSpace = document.getElementById( "warn-space" );
    var transactionSpace = document.getElementById( "transaction-space" );

    navSpace.innerText = "";
    tranSpace.innerText = "";
    warnSpace.innerText = "";
    transactionSpace.innerText = "";

  },

  display: function() {

    var navSpace = document.getElementById( "nav-space" );

    var transactions = document.createElement( "h5" );
    transactions.innerText = "transactions";
    transactions.onclick = function() {
      this.clear();
      var transView = new TransView();
    }.bind( this );

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

    navSpace.appendChild( transactions );
    navSpace.appendChild( totals );
    navSpace.appendChild( graphs );
  },
};

module.exports = NavView;