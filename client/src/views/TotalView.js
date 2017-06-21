var TotalView = function() {
  this.url = "http://localhost:5000/trans";
  this.transactions = [];
  this.getTransactions();
};

TotalView.prototype = {
  getTransactions: function() {
    var transactionSpace = document.getElementById( 'transaction-space' );
    transactionSpace.innerText = "";
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
    
  }
};

module.exports = TotalView;