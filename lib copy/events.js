'use strict';
const Events = require('events');//module node.js built in!
const eventEmitter = new Events();// Events --> class (we use new Events())

module.exports = eventEmitter;