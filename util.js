'use strict';
const utils = {
	randInt: range => Math.floor(Math.random() * (range)),
	range: count => Array.apply(null, Array(count)).map((value, key) => key),
	loop: (count, callback) => {for(let i = 0; i< count; i++) callback()}
}
module.exports = utils;