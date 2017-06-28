var TransView = require( './TransView' );
var TotalView = require( './TotalView' );
var GraphView = require( './GraphView' );

function NavView() {
  this.url = "http://localhost:5000/trans";
  // this.url = "https://money-tracker-test.herokuapp.com/trans";
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

    var navBar = document.createElement( "ul" );
    var transactions = document.createElement( "li" );
    transactions.innerText = "transactions";
    transactions.onclick = function() {
      this.clear();
      this.showTrans();
    }.bind( this );

    var totals = document.createElement( "li" );
    totals.innerText = "totals";
    totals.onclick = function() {
      this.clear();
      this.showTotals();
    }.bind( this );

    var graphs = document.createElement( "li" );
    graphs.innerText = "graphs";
    graphs.onclick = function() {
      this.clear();
      this.showGraphs();
    }.bind( this );

    navBar.appendChild( transactions );
    navBar.appendChild( totals );
    navBar.appendChild( graphs );
    navSpace.appendChild( navBar );

    var transView = new TransView();
    var totalView = new TotalView();
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
        var graphView = new GraphView( this.debit, this.credit, this.transactions );
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