var TotalView = function( transactions ) {
  // this.url = "http://localhost:5000/trans";
  this.url = "https://money-tracker-test.herokuapp.com/trans";
  this.transactions = transactions;
  this.display();
  this.total = 0;
  this.debit = 0;
  this.credit = 0;
};

TotalView.prototype = {

  display: function() {
    this.clear();
    this.total = 0;

    var totalSpace = document.getElementById( "total-space" );

    var totalText = document.createElement( "h3" );
    totalText.innerText = "Your cash";

    var text = document.createElement( "ul" );
    text.style.display = "inline-block";
    text.style.float = "left";

    var totals = document.createElement( "ul" );
    totals.style.display = "inline-block";

    totalSpace.appendChild( totalText );
    totalSpace.appendChild( text );
    totalSpace.appendChild( totals );

    for ( var i = 0; i < this.transactions.length; i++ ) {

      this.makeTotal( this.transactions[i], i )

      var textList = document.createElement( "ul" );
      var totalList = document.createElement( "ul" );

      var transaction = document.createElement( "p" );
      transaction.innerText = this.transactions[i].description;

      var amountText = document.createElement( "p" );
      var amount = this.transactions[i].amount;

      if( this.transactions[i].debit ) {
        amountText.innerText = "-" + ( Math.round( amount * 100 ) / 100 ).toFixed(2);
        amountText.style.color = "red";
        this.debit += Math.round( amount * 100) / 100;
      } else {
        amountText.innerText = ( Math.round( amount * 100 ) / 100 ).toFixed(2);
        amountText.style.color = "black";
        this.credit += ( Math.round( amount * 100 ) / 100 );
      }

      textList.appendChild( transaction );
      totalList.appendChild( amountText );
      text.appendChild( textList );
      totals.appendChild( totalList );
    }

    var grandTotal = document.createElement( "h2" );

    if ( this.total < 0 ) {
      grandTotal.style.color = "red";
    } else {
      grandTotal.style.color = "black";
    }

    grandTotal.innerText = parseFloat(Math.round(this.total * 100) / 100).toFixed(2);
    totalSpace.appendChild( grandTotal );
  },

  clear: function() {
    var totalSpace = document.getElementById( "total-space" );
    while( totalSpace.hasChildNodes() ) {
      totalSpace.removeChild( totalSpace.lastChild );
    }
  },

  makeTotal: function( transaction, index ) {
    if( transaction.debit ) {
        this.total -= transaction.amount
    } else {
        this.total += transaction.amount
    }
  }
};

module.exports = TotalView;