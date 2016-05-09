'use strict';

const Core = require('renders/Core');

/* We're only going to be instantiating one renderer at a time! */
var instance;

/**Static class for rendering the overworld view */
module.exports = class Overworld extends Core {

	render() {
		this.ctx.fillStyle = '#ABC';
		this.ctx.fillRect(0, 0, 20, 20);
	}
}
