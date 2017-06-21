var TotalView = function() {
  this.url = "http://localhost:5000/trans";
  this.transactions = [];
  this.getTransactions();
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

    var totalSpace = document.getElementById( "total-space" );

    var totalText = document.createElement( "h3" );
    totalText.innerText = "Your cash";


    var totals = document.createElement( "ul" );
    totalSpace.appendChild( totalText );
    totalSpace.appendChild( totals );

    for ( var i = 0; i < this.transactions.length; i++ ) {

    }
  },

  clear: function() {
    var totalSpace = document.getElementById( "total-space" );
    while( totalSpace.hasChildNodes() ) {
      totalSpace.removeChild( totalSpace.lastChild );
    }
  }
};

module.exports = TotalView;