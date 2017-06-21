var MainView = function(){
  this.start();
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
      this.addTransaction();
    }.bind( this );

    mainSpace.appendChild( transText );
    mainSpace.appendChild( transBox );
    mainSpace.appendChild( transAmount );
    mainSpace.appendChild( transInOut );
    mainSpace.appendChild( transType );
    mainSpace.appendChild( transTypeText );
    mainSpace.appendChild( transButton );
  },

  addTransaction: function() {
      console.log( "Hello Again" );
  }

};

module.exports = MainView;