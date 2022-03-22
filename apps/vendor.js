"use strict";
// const eventEmitter = require("../lib/events"); // Events --> class (we use new Events())
// // const chance = require('chance');
// const { faker } = require("@faker-js/faker");

// function vendorClient(storeName) {
//   const orderInfo = {
//     store: storeName,
//     orderID: faker.datatype.uuid(),
//     customer: faker.name.findName(),
//     address: `${faker.address.city()}, ${faker.address.streetAddress()}`,
//   };
//   eventEmitter.emit("pickup", {
//     event: "pickup",
//     time: new Date(),
//     payLoad: orderInfo,
//   });
// }

// function deliveredHandler(payLoad) {
//   console.log(payLoad);
//   console.log(`DRIVER: delivered up ${payLoad.payLoad.orderID}`);
//   console.log(`VENDOR: Thank you for delivering ${payLoad.payLoad.orderID}`);
// }

// module.exports = {vendorClient:vendorClient, deliveredHandler:deliveredHandler};
const io = require('socket.io-client');
const { faker } = require("@faker-js/faker");
const host ='http://localhost:3000'; 
const cspsConnection = io.connect(host);
cspsConnection.on('start',()=>{

  const orderInfo = {
    store: faker.company.companyName(),
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.streetAddress()}`,
  };
  cspsConnection.emit('pickup',{event:'pickup', time:new Date(), payload: orderInfo})
  cspsConnection.on('delivered',()=>{
    console.log(`thank you for delivering order:${orderInfo.orderID}`)
  })
})