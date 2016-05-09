/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Imports */

	var Game = __webpack_require__(1);
	var Logger = __webpack_require__(4);

	/* Instantiations */
	var cvs = document.getElementById('RipplesCanvas');

	if (cvs === null) Logger.log('Unable to find canvas #RipplesCanvas');else {
		var game = new Game(cvs);

		/* If the <canvas> has the 'data-debug' attribute, enable debugging */
		if (cvs.getAttribute('data-debug') !== null) game.debug = true;

		Logger.debug(game.debug, 'Ripples v0.0 initialized');
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var OverworldRender = __webpack_require__(2);

	/**Class representing the root game
	 * All sub-modules of the appliaction is accessible via this object unless
	 * protection is explicitly declared */
	module.exports = function () {

		/**
	  * @param {HTMLCanvasElement} cvs The target canvas of the game */

		function Game(cvs) {
			_classCallCheck(this, Game);

			this.cvs = cvs;

			/* Debugging is off by default */
			this._debug = false;

			/* We disable alpha as it can unnecessarily waste CPU cycles */
			this._ctx = cvs.getContext('2d', { alpha: false });

			this.r = new OverworldRender(this);
			this.r.start();
		}

		_createClass(Game, [{
			key: 'ctx',
			get: function get() {
				return this._ctx;
			}
		}, {
			key: 'debug',
			set: function set(debug) {
				this._debug = debug;
			},
			get: function get() {
				return this._debug;
			}
		}]);

		return Game;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Core = __webpack_require__(3);

	/* We're only going to be instantiating one renderer at a time! */
	var instance;

	/**Static class for rendering the overworld view */
	module.exports = function (_Core) {
		_inherits(Overworld, _Core);

		function Overworld() {
			_classCallCheck(this, Overworld);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Overworld).apply(this, arguments));
		}

		_createClass(Overworld, [{
			key: 'render',
			value: function render() {
				this.ctx.fillStyle = '#ABC';
				this.ctx.fillRect(0, 0, 20, 20);
			}
		}]);

		return Overworld;
	}(Core);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
		return setTimeout(callback, 1000 / 60);
	};

	/**Core rendering class */
	module.exports = function () {
		function Core(game) {
			var _this = this;

			_classCallCheck(this, Core);

			this._game = game;
			this.doDraw = false;
			this.lastFrame = -1;

			/* Cached the bound function call as requestAnimationFrame switches
	   * context */
			this.drawCall = function (timeframe) {
				return _this.draw(timeframe);
			};
		}

		_createClass(Core, [{
			key: 'draw',
			value: function draw(tf) {
				if (!this.doDraw) return;

				var tm = this.lastFrame < 0 ? 1 : (tf - this.lastFrame) / 1000;
				this.lastFrame = tf;

				this.render();
				requestAnimationFrame(this.drawCall);
			}
		}, {
			key: 'start',
			value: function start() {
				if (this.doDraw) return;

				this.doDraw = true;
				this.lastFrame = -1;
				requestAnimationFrame(this.drawCall);
			}
		}, {
			key: 'stop',
			value: function stop() {
				this.doDraw = false;
			}
		}, {
			key: 'game',
			get: function get() {
				return this._game;
			}
		}, {
			key: 'ctx',
			get: function get() {
				return this.game.ctx;
			}
		}]);

		return Core;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**Static logging class */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
		function Logger() {
			_classCallCheck(this, Logger);
		}

		_createClass(Logger, null, [{
			key: 'debug',
			value: function debug() {
				var _console;

				for (var _len = arguments.length, msgs = Array(_len), _key = 0; _key < _len; _key++) {
					msgs[_key] = arguments[_key];
				}

				if (msgs[0] === true) (_console = console).log.apply(_console, [timestamp() + ' DBG:'].concat(_toConsumableArray(msgs.slice(1))));
			}
		}, {
			key: 'log',
			value: function log() {
				var _console2;

				for (var _len2 = arguments.length, msgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					msgs[_key2] = arguments[_key2];
				}

				(_console2 = console).log.apply(_console2, [timestamp() + ' NFO:'].concat(msgs));
			}
		}, {
			key: 'warn',
			value: function warn() {
				var _console3;

				for (var _len3 = arguments.length, msgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					msgs[_key3] = arguments[_key3];
				}

				(_console3 = console).log.apply(_console3, [timestamp() + ' WRN:'].concat(msgs));
			}
		}, {
			key: 'error',
			value: function error() {
				var _console4;

				for (var _len4 = arguments.length, msgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
					msgs[_key4] = arguments[_key4];
				}

				(_console4 = console).log.apply(_console4, [timestamp() + ' ERR:'].concat(msgs));
			}
		}]);

		return Logger;
	}();

	var d = new Date();
	function timestamp() {
		return ('00' + d.getHours()).slice(-2) + ':' + ('00' + d.getMinutes()).slice(-2);
	}

/***/ }
/******/ ]);