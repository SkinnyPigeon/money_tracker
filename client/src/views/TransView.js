var NavView = require( './NavView' );
var TotalView = require( './TotalView' );

function TransView() {
  this.display();
  // this.url = "http://localhost:5000/trans";
  this.url = "https://money-tracker-test.herokuapp.com/trans";
};

TransView.prototype = {

  display: function() {
    this.clear();
    var tranSpace = document.getElementById( "trans-space" );

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
        transTypeText.innerText ="😁"
      }
    }

    var transTypeText = document.createElement( "p" );
    transTypeText.innerText = "😫";

    var transButton = document.createElement( "button" );
    transButton.innerText = "Add transaction";
    transButton.onclick = function() {
      var warnSpace = document.getElementById( "warn-space" );
      warnSpace.innerText = "";
      if(( !transBox.value ) || ( !transAmount.value )) {
        this.displayWarning( transBox.value, transAmount.value );
        return;
      }
      this.addTransaction( transBox.value, transAmount.value, transType.checked );
    }.bind( this );

    tranSpace.appendChild( transText );
    tranSpace.appendChild( transBox );
    tranSpace.appendChild( transAmount );
    tranSpace.appendChild( transInOut );
    tranSpace.appendChild( transType );
    tranSpace.appendChild( transTypeText );
    tranSpace.appendChild( transButton );
  },

  addTransaction: function( description, amount, type ) {

      var debit = true;
      if ( type ) {
        debit = false;
      } else {
        debit = true;
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

  displayTotal: function() {
    var view = new TotalView();
  },

  displayWarning: function( description, amount ) {
    var warnSpace = document.getElementById( "warn-space" );
    warnSpace.innerText = "";
    if( !description ) {
      var descriptionWarning = document.createElement( "p" );
      descriptionWarning.innerText = "Please add a description";
      warnSpace.appendChild( descriptionWarning );
    }
    if( !amount ) {
      var amountWarning = document.createElement( "p" );
      amountWarning.innerText = "Please add a amount";
      warnSpace.appendChild( amountWarning );
    }
  },

  displayHome: function() {
    var navView = document.getElementById( "nav-space" );
    navView.style.display = "block";
  },

  clear: function() {
    var tranSpace = document.getElementById( "trans-space" );
    while( tranSpace.hasChildNodes() ) {
      tranSpace.removeChild( tranSpace.lastChild );
    }
    var warnSpace = document.getElementById( "warn-space" );
    while( warnSpace.hasChildNodes() ) {
      warnSpace.removeChild( warnSpace.lastChild );
    }
  }


};

module.exports = TransView;