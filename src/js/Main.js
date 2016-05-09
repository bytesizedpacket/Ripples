'use strict';

/* Imports */
const Game = require('Game');
const Logger = require('Logger');

/* Instantiations */
const cvs = document.getElementById('RipplesCanvas');

if(cvs === null) Logger.log('Unable to find canvas #RipplesCanvas');
else {
	const game = new Game(cvs);

	/* If the <canvas> has the 'data-debug' attribute, enable debugging */
	if( cvs.getAttribute('data-debug') !== null ) game.debug = true;

	game.ctx.fillStyle = '#ABC';
	game.ctx.fillRect(20, 20, 20, 20);

	Logger.debug(game.debug, 'Ripples v0.0 initialized');
}
