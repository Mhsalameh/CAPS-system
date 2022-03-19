'use strict';
const { faker } = require("@faker-js/faker");
const {start} = require("../csps.js")

let consoleSpy;
let orderInfo;

describe('testing csps',()=>{
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
      jest.spyOn(global, "setInterval");
    });
    
    afterEach(() => {
      consoleSpy.mockRestore();
      jest.useRealTimers();
    });

    it('testing app interval',()=>{
        start()
        jest.advanceTimersByTime(5000);
        // jest.runAllTimers()
        expect(consoleSpy).toHaveBeenCalledTimes(1)
        jest.advanceTimersByTime(1000);
        expect(consoleSpy).toHaveBeenCalledTimes(3);
        jest.advanceTimersByTime(2000);
        expect(consoleSpy).toHaveBeenCalledTimes(6);
    })
})
