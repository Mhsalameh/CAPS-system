"use strict";
// const eventEmitter = require('./lib/events');// Events --> class (we use new Events())
// const {inTransitHandler,pickUpHandler}= require('./apps/driver')
// const {deliveredHandler}=require('./apps/vendor.js')
// const {vendorClient} = require("./apps/vendor");
// const { faker } = require("@faker-js/faker");

require("dotenv").config();
const port = process.env.PORT;
const io = require("socket.io")(port);
let orderInfo;
io.on("connection", (socket) => {
  console.log(`connected with ${socket.id}`);

  socket.on("order", () => {
    console.log('starting order event....')
    io.emit('start')

  });
    socket.on("pickup", (payload) => {
      //will start the pickup with a payload
      if (payload) {
        orderInfo = payload.payload;
        console.log(payload);
      }
      io.emit("sendInfo", { orderInfo });
    });
    socket.on("in-transit", (payload) => {
      setTimeout(() => {
        io.emit("in-transit");
        if (payload) {
          console.log(payload);
        }
      }, 3000);
    });
    socket.on("delivered", (payload) => {
      setTimeout(() => {
        io.emit("delivered");
        if (payload) {
          console.log(payload);
        }
      }, 6000);
    });
});

// eventEmitter.on("pickup", pickUpHandler);
// eventEmitter.on("in-transit", inTransitHandler);
// eventEmitter.on("delivered", deliveredHandler);

// function start(){
//     setInterval(() => {
//       vendorClient(faker.company.companyName());
//   }, 5000);
// }
// start ();

// module.exports = {start:start}
