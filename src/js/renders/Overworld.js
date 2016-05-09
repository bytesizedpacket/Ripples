'use strict';

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || ( callback=> setTimeout(callback, 1000/60) );

/* We're only going to be instantiating one renderer at a time! */
var instance;

/**Static class for rendering the overworld view */
module.exports = class Overworld {
	
	constructor(game) {
		this._game = game;
		this.doDraw = false;

		if(typeof instance === 'undefined') instance = this;
		else throw 'While instantiating render: Already instantiated once!'
	}

	draw() {
		this.ctx.fillRect( Math.random()*100 |0, Math.random()*100 |0, 20, 20);
	}

	start() {
		this.doDraw = true;
		draw();
	}

	stop() { this.doDraw = false }

	get game() { return this._game }
	get ctx() { return this.game.ctx }

}

function draw() {
	if(instance.doDraw) {
		instance.draw();
		requestAnimationFrame(draw);
	}
}
