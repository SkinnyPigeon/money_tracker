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

	// var TransView = require( './views/TransView' );
	var NavView = __webpack_require__( 4 );
	
	window.onload = function() {
	  nav();
	};
	
	var nav = function(){
	  var navView = new NavView();
	};

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	var NavView = function() {
	  this.clear();
	  this.display();
	};
	
	NavView.prototype = {
	  clear: function() {
	
	    var tranSpace = document.getElementById( "trans-space" );
	    var warnSpace = document.getElementById( "warn-space" );
	    var transactionSpace = document.getElementById( "transaction-space" );
	
	    tranSpace.innerText = "";
	    warnSpace.innerText = "";
	    transactionSpace.innerText = "";
	
	  },
	
	  display: function() {
	
	    var navSpace = document.getElementById( "nav-space" );
	
	    var transactions = document.createElement( "h5" );
	    transactions.innerText = "transactions";
	    transactions.onclick = function() {
	      console.log( "trans" );
	    };
	
	    var totals = document.createElement( "h5" );
	    totals.innerText = "totals";
	    totals.onclick = function() {
	      console.log( "totals" );
	    };
	
	    var graphs = document.createElement( "h5" );
	    graphs.innerText = "graphs";
	    graphs.onclick = function() {
	      console.log( "graphs" );
	    };
	
	    navSpace.appendChile( transactions );
	    navSpace.appendChile( totals );
	    navSpace.appendChile( graphs );
	  },
	};
	
	module.exports = NavView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map