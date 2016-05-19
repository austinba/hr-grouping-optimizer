'use strict';
const util = {
	randInt: range => Math.floor(Math.random() * range),
	range: count => Array.apply(null, Array(count)).map((value, key) => key),
	loop: (count, callback) => {for(let i = 0; i< count; i++) callback(i)},
	formatStringLen: (str, len) => (str + Array(len+1).join(' ')).slice(0, len),
	dropRandomItemFromArray: arr => arr.splice(Math.floor(arr.length * Math.random()),1)[0],
	dropNRandomItemsFromArray: (arr, n) => util.range(n).map(() => util.dropRandomItemFromArray(arr)),
	forEachDefined: (arr, callback) => arr.forEach((item, key) => {if(item!==undefined) callback(item,key);})
}
module.exports = util;