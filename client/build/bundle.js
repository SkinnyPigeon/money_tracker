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

	var MainView = __webpack_require__( 1 );
	
	window.onload = function() {
	  main();
	};
	
	var main = function(){
	  var mainView = new MainView();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

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
	        // console.log( tran );
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
	  }
	
	};
	
	module.exports = MainView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map