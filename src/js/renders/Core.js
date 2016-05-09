'use strict';

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || ( callback=> setTimeout(callback, 1000/60) );

/**Core rendering class */
module.exports = class Core {
	
	constructor(game) {
		this._game = game;
		this.doDraw = false;
		this.lastFrame = -1;

		/* Cached the bound function call as requestAnimationFrame switches
		 * context */
		this.drawCall = timeframe=> this.draw(timeframe);
	}

	draw(tf) {
		if(!this.doDraw) return;
		
		var tm = this.lastFrame < 0? 1 : (tf - this.lastFrame) / 1000;
		this.lastFrame = tf;

		this.render();
		requestAnimationFrame(this.drawCall);
	}

	start() {
		if(this.doDraw) return;

		this.doDraw = true;
		this.lastFrame = -1;
		requestAnimationFrame(this.drawCall);
	}

	stop() { this.doDraw = false }

	get game() { return this._game }
	get ctx() { return this.game.ctx }

}
