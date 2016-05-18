'use strict';
const utils = {
	randInt: range => Math.floor(Math.random() * (range)),
	range: count => Array.apply(null, Array(count)).map((value, key) => key)
}
module.exports = utils;