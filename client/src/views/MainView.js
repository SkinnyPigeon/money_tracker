var TotalView = require( './TotalView' );

var MainView = function(){
  this.start();
  this.url = "http://localhost:5000/trans";
};

MainView.prototype = {

  start: function() {

    var mainSpace = document.getElementById( "main-space" );

    var transText = document.createElement( "p" );
    transText.innerText = "Transaction: ";

    var transBox = document.createElement( "input" );
    transBox.placeholder = "Transaction description...";
    transBox.id = "tranBoxID";

    var transAmount = document.createElement( "input" );
    transAmount.placeholder = "How much?  ";
    transAmount.type = "number";

    var transInOut = document.createElement( "p" );
    transInOut.innerText = "In or Out?";

    var transType = document.createElement( "input" );
    transType.type = "checkbox";
    transType.id = "transTypeID";
    transType.onclick = function() {
      if( !transType.checked ) {
        transTypeText.innerText = "😫"
      } else {
        transTypeText.innerText = "😁"
      }
    }

    var transTypeText = document.createElement( "p" );
    transTypeText.innerText = "😫";


    var transButton = document.createElement( "button" );
    transButton.innerText = "Add transaction";
    transButton.onclick = function() {
      this.addTransaction( transBox.value, transAmount.value, transType.checked );
    }.bind( this );

    mainSpace.appendChild( transText );
    mainSpace.appendChild( transBox );
    mainSpace.appendChild( transAmount );
    mainSpace.appendChild( transInOut );
    mainSpace.appendChild( transType );
    mainSpace.appendChild( transTypeText );
    mainSpace.appendChild( transButton );
  },

  addTransaction: function( description, amount, type ) {
      console.log( type );

      var debit = false;
      if ( type ) {
        debit = true;
      } else {
        debit = false;
      }

      var request = new XMLHttpRequest();
      request.open( 'POST', this.url );
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = () => {
        this.display();
      }
      var data = {
        tran: {
          description: description,
          amount: amount,
          debit: debit,
        }
      }
      request.send( JSON.stringify( data ));
      console.log( data.transaction );
  },

  display: function() {
    var view = new TotalView();
  }

};

module.exports = MainView;