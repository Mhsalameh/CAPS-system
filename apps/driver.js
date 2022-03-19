const eventEmitter = require("../lib/events"); // Events --> class (we use new Events())

let orderPayLoad;
function pickUpHandler(payLoad) {
  orderPayLoad = payLoad.payLoad;
  console.log(payLoad);
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payLoad.payLoad.orderID}`);
    eventEmitter.emit("in-transit", {
      event: "in-transit",
      time: new Date(),
      payLoad: orderPayLoad,
    });
  }, 1000);
}

function inTransitHandler(payLoad) {
  console.log(payLoad);
  setTimeout(() => {
    eventEmitter.emit("delivered", {
      event: "delivered",
      time: new Date(),
      payLoad: orderPayLoad,
    });
  }, 2000);
}

//  function start() {
//   setInterval(() => {
//     vendorClient(faker.company.companyName());
// }, 5000);
// }


module.exports={ inTransitHandler:inTransitHandler , pickUpHandler:pickUpHandler};
