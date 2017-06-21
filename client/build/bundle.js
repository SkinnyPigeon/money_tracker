/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var NavView = __webpack_require__( 4 );
	
	window.onload = function() {
	  nav();
	};
	
	var nav = function(){
	  var navView = new NavView();
	};

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

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
	      } else {
	        amountText.innerText = "-" + amount;
	        amountText.style.color = "red";
	      }
	      textList.appendChild( transaction );
	      totalList.appendChild( amountText );
	      text.appendChild( textList );
	      totals.appendChild( totalList );
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var NavView = __webpack_require__( 4 );
	var TotalView = __webpack_require__( 2 );
	
	function TransView() {
	  this.display();
	  this.url = "http://localhost:5000/trans";
	};
	
	TransView.prototype = {
	
	  display: function() {
	    this.clear();
	    var tranSpace = document.getElementById( "trans-space" );
	
	    var navText = document.createElement( "h5" );
	    navText.innerText = "Home";
	    navText.onclick = function() {
	      this.clear();
	      this.displayHome();
	    }.bind( this );
	
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
	
	    tranSpace.appendChild( navText );
	    tranSpace.appendChild( transText );
	    tranSpace.appendChild( transBox );
	    tranSpace.appendChild( transAmount );
	    tranSpace.appendChild( transInOut );
	    tranSpace.appendChild( transType );
	    tranSpace.appendChild( transTypeText );
	    tranSpace.appendChild( transButton );
	  },
	
	  addTransaction: function( description, amount, type ) {
	
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
	        this.displayTotal();
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var TransView = __webpack_require__( 3 );
	var TotalView = __webpack_require__( 2 );
	
	function NavView() {
	  this.clear();
	  this.display();
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
	      console.log( "graphs" );
	    };
	
	    navSpace.appendChild( transactions );
	    navSpace.appendChild( totals );
	    navSpace.appendChild( graphs );
	  },
	};
	
	module.exports = NavView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map