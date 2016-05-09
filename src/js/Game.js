'use strict';

const OverworldRender = require('renders/Overworld');

/**Class representing the root game
 * All sub-modules of the appliaction is accessible via this object unless
 * protection is explicitly declared */
module.exports = class Game {
	
	/**
	 * @param {HTMLCanvasElement} cvs The target canvas of the game */
	constructor(cvs) {
		this.cvs = cvs;

		/* Debugging is off by default */
		this._debug = false;

		/* We disable alpha as it can unnecessarily waste CPU cycles */
		this._ctx = cvs.getContext('2d', { alpha: false });

		this.r = new OverworldRender(this);
		this.r.start();
	}

	get ctx() { return this._ctx }

	set debug(debug) { this._debug = debug }
	get debug() { return this._debug }
}
