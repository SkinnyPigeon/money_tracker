var TransView = require( './TransView' );

function NavView() {
  this.clear();
  this.display();
};

NavView.prototype = {
  clear: function() {

    var navSpace = document.getElementById( "nav-space" );
    var tranSpace = document.getElementById( "trans-space" );
    var warnSpace = document.getElementById( "warn-space" );
    var transactionSpace = document.getElementById( "transaction-space" );

    navSpace.style.display = "none";
    tranSpace.style.display = "none";
    warnSpace.style.display = "none";
    transactionSpace.style.display = "none";

  },

  display: function() {

    var navSpace = document.getElementById( "nav-space" );
    navSpace.style.display = "block";

    var transactions = document.createElement( "h5" );
    transactions.innerText = "transactions";
    transactions.onclick = function() {
      this.clear();
      var transView = new TransView();
      var tranSpace = document.getElementById( "trans-space" );
      tranSpace.style.display = "block";
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