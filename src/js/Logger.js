'use strict';

/**Static logging class */
module.exports = class Logger {

	static debug(...msgs) {
		if(msgs[0] === true) console.log( timestamp() + ' DBG:', ...msgs.slice(1) );
	}

	static log(...msgs) {
		console.log( timestamp() + ' NFO:', ...msgs );
	}

	static warn(...msgs) {
		console.log( timestamp() + ' WRN:', ...msgs );
	}

	static error(...msgs) {
		console.log( timestamp() + ' ERR:', ...msgs );
	}

}

const d = new Date();
function timestamp() {
	return ( '00' + d.getHours() ).slice(-2) + ':' + ( '00' + d.getMinutes() ).slice(-2);
}
