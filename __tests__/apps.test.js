"use strict";
const { faker } = require("@faker-js/faker");
const eventEmitter = require("../lib/events"); // Events --> class (we use new Events())
const { inTransitHandler, pickUpHandler } = require("../apps/driver");
const { deliveredHandler } = require("../apps/vendor.js");

let consoleSpy;
let orderInfo;

beforeEach(() => {
  orderInfo = {
    store: "storeName",
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.streetAddress()}`,
  };
  consoleSpy = jest.spyOn(console, "log").mockImplementation();
  // console.log(consoleSpy);
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
});

afterEach(() => {
  consoleSpy.mockRestore();
  jest.useRealTimers();
});
describe("testing caps", () => {
  it("testing pickup handler", () => {
    eventEmitter.on("pickup", pickUpHandler);
    eventEmitter.emit("pickup", {
      event: "pickup",
      time: "new Date()",
      payLoad: orderInfo,
    });
    expect(consoleSpy).toHaveBeenCalledWith({
      event: "pickup",
      time: "new Date()",
      payLoad: orderInfo,
    });
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
    expect(consoleSpy).toHaveBeenCalledWith(
      `DRIVER: picked up ${orderInfo.orderID}`
    );
  });
  it("testing in-transit handler", () => {
    eventEmitter.on("in-transit", inTransitHandler);
    eventEmitter.emit("in-transit", {
      event: "in-transit",
      time: "new Date()",
      payLoad: orderInfo,
    });
    expect(consoleSpy).toHaveBeenCalledWith({
      event: "in-transit",
      time: "new Date()",
      payLoad: orderInfo,
    });
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
  });
  it("testing delivered handler", () => {
    eventEmitter.on("delivered", deliveredHandler);
    eventEmitter.emit("delivered", {
      event: "deliverd",
      time: "new Date()",
      payLoad: orderInfo,
    });
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenCalledWith({
        event: "deliverd",
        time: "new Date()",
        payLoad: orderInfo,
      })
    expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: delivered up ${orderInfo.orderID}`)
    expect(consoleSpy).toHaveBeenLastCalledWith(`VENDOR: Thank you for delivering ${orderInfo.orderID}`)
  });
});
