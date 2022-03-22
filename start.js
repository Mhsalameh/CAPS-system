'use strict';
const io = require('socket.io-client');
const host ='http://localhost:3000'; 
const cspsConnection = io.connect(host);

cspsConnection.emit('order')