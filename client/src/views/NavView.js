var TransView = require( './TransView' );
var TotalView = require( './TotalView' );
var GraphView = require( './GraphView' );

function NavView() {
  // this.url = "http://localhost:5000/trans";
  this.url = "https://money-tracker-test.herokuapp.com/trans";
  this.clear();
  this.getTransactions();
  this.display();
  this.transactions = [];
  this.debit = 0;
  this.credit = 0;
};

NavView.prototype = {
  clear: function() {

    var navSpace = document.getElementById( "nav-space" );
    var tranSpace = document.getElementById( "trans-space" );
    var warnSpace = document.getElementById( "warn-space" );
    var transactionSpace = document.getElementById( "transaction-space" );

    navSpace.style.display = "none";

  },

  display: function() {

    var navSpace = document.getElementById( "nav-space" );
    navSpace.style.display = "block";

    var transactions = document.createElement( "h5" );
    transactions.innerText = "transactions";
    transactions.onclick = function() {
      this.clear();
      var transView = new TransView();
    }.bind( this );

    var totals = document.createElement( "h5" );
    totals.innerText = "totals";
    totals.onclick = function() {
      this.clear();
      var totalView = new TotalView();
    }.bind( this );

    var graphs = document.createElement( "h5" );
    graphs.innerText = "graphs";
    graphs.onclick = function() {
      this.clear();
      this.checkTotals();
      var graphView = new GraphView( this.debit, this.credit, this.transactions );
    }.bind( this );

    navSpace.appendChild( transactions );
    navSpace.appendChild( totals );
    navSpace.appendChild( graphs );
  },

  getTransactions: function() {
    var request = new XMLHttpRequest();
    request.open( 'GET', this.url );
    request.setRequestHeader("Content-Type", "application/json")

    request.onload = () => {
      if( request.status === 200 ) {
        var transactions = JSON.parse( request.responseText );
        this.transactions = transactions;
        this.checkTotals();
      }
    }
    request.send( null );
  },

  checkTotals: function() {
    this.debit = 0;
    this.credit = 0;
    for( var i = 0; i < this.transactions.length; i++ ) {
      if( this.transactions[i].debit ) {
        this.debit += this.transactions[i].amount;
      } else {
        this.credit += this.transactions[i].amount;
      }
    }
  },
};

module.exports = NavView;