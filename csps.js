'use strict'
const eventEmitter = require('./lib/events');// Events --> class (we use new Events())
const {inTransitHandler,pickUpHandler}= require('./apps/driver')
const {deliveredHandler}=require('./apps/vendor.js')
const {vendorClient} = require("./apps/vendor");
const { faker } = require("@faker-js/faker");


eventEmitter.on("pickup", pickUpHandler);
eventEmitter.on("in-transit", inTransitHandler);
eventEmitter.on("delivered", deliveredHandler);

function start(){
    setInterval(() => {
      vendorClient(faker.company.companyName());
  }, 5000);
}
start ();

module.exports = {start:start}