"use strict";
const eventEmitter = require("../lib/events"); // Events --> class (we use new Events())
// const chance = require('chance');
const { faker } = require("@faker-js/faker");

function vendorClient(storeName) {
  const orderInfo = {
    store: storeName,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.streetAddress()}`,
  };
  eventEmitter.emit("pickup", {
    event: "pickup",
    time: new Date(),
    payLoad: orderInfo,
  });
}
eventEmitter.on("delivered", (payLoad)=>{
  console.log(`VENDOR: Thank you for delivering ${payLoad.payLoad.orderID}`)
});
function deliveredHandler(payLoad) {
  console.log(payLoad);
  console.log(`DRIVER: delivered up ${payLoad.payLoad.orderID}`);
}

module.exports = {vendorClient:vendorClient, deliveredHandler:deliveredHandler};
