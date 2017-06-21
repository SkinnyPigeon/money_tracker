var MainView = function(){
  this.start();
};

MainView.prototype = {

  start: function() {

    var mainSpace = document.getElementById( "main-space" );

    var transText = document.createElement( "p" );
    transText.innerText = "Transaction: ";

    var transBox = document.createElement( "input" );
    transBox.placeHolder = "Please enter transaction description...";
    transBox.id = "tranBoxID";

    var amount = document.createElement( "input" );
    amount.placeHolder = "How much?  ";
    amount.type = "number";

    var transInOut = document.createElement( "p" );
    transInOut.innerText = "In or Out?";

    var transType = document.createElement( "input" );
    transType.type = "checkbox";
    transType.id = "transTypeID";

     


  },

};

module.exports = MainView;