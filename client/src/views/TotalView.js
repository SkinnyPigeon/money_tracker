var TotalView = function() {
  this.url = "http://localhost:5000/trans";
  this.transactions = [];
  this.getTransactions();
  this.total = 0;
};

TotalView.prototype = {
  getTransactions: function() {
    var totalSpace = document.getElementById( 'total-space' );
    totalSpace.innerText = "";
    var request = new XMLHttpRequest();
    request.open( 'GET', this.url );
    request.setRequestHeader("Content-Type", "application/json")

    request.onload = () => {
      if( request.status === 200 ) {
        var transactions = JSON.parse( request.responseText );
        this.transactions = transactions;
        this.display();
        console.log( transactions );
      }
    }
    request.send( null );
  },

  display: function() {
    this.clear();
    this.total = 0;


    var navText = document.createElement( "h5" );
    navText.innerText = "Home";
    navText.onclick = function() {
      this.clear();
      this.displayHome();
    }.bind( this );


    var totalSpace = document.getElementById( "total-space" );
    totalSpace.appendChild( navText );

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
      var textList = document.createElement( "ul" );
      var totalList = document.createElement( "ul" );

      var transaction = document.createElement( "p" );
      transaction.innerText = this.transactions[i].description;

      var amountText = document.createElement( "p" );
      var amount = this.transactions[i].amount;
      if( this.transactions[i].debit ) {
        amountText.innerText = amount;
        amountText.style.color = "black";
        this.total += amount;
      } else {
        amountText.innerText = "-" + amount;
        amountText.style.color = "red";
        this.total -= amount;
      }
      textList.appendChild( transaction );
      totalList.appendChild( amountText );
      text.appendChild( textList );
      totals.appendChild( totalList );
    }

    var grandTotal = document.createElement( "h2" );
    grandTotal.innerText = this.total;

    totalSpace.appendChild( grandTotal );

  },

  clear: function() {
    var totalSpace = document.getElementById( "total-space" );
    while( totalSpace.hasChildNodes() ) {
      totalSpace.removeChild( totalSpace.lastChild );
    }
  },

  displayHome: function() {
    var navView = document.getElementById( "nav-space" );
    navView.style.display = "block";
  },
};

module.exports = TotalView;