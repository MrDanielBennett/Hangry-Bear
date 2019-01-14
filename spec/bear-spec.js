import { Bear } from './../src/bear.js';
import { Hiker } from './../src/bear.js';


describe('Bear', function() {
  let hangryBear;
  let lonelyHiker;

  beforeEach(function() {
    hangryBear = new Bear('Lucky');
    lonelyHiker = new Hiker('Kyle');
    jasmine.clock().install();
    hangryBear.updateBearStats(lonelyHiker);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("should have a name and a food level of 10 when created", function() {
    expect(hangryBear.name).toEqual("Lucky");
    expect(hangryBear.foodLevel).toEqual(10);
  });

  it("should have a food level of 7 after 9 seconds", function() {
    jasmine.clock().tick(9001);
    expect(hangryBear.foodLevel).toEqual(7);
  });

  it("should have an anger level of 1 after 18 seconds", function() {
    jasmine.clock().tick(18001);
    expect(hangryBear.angerLevel).toEqual(1);
  });

  it("should have an anger level of 5 after 18 seconds", function() {
    jasmine.clock().tick(30001);
    expect(hangryBear.angerLevel).toEqual(9);
  });

  it("should increase sleepiness level by 1 every 3 seconds if food level is above 8", function() {
    jasmine.clock().tick(6001);
    expect(hangryBear.sleepyLevel).toEqual(2);
  });

  it("should attack a hiker when anger is above 1. Hiker health loss is equal to bear anger level", function() {
    jasmine.clock().tick(19001);
    expect(lonelyHiker.health).toEqual(9);
  });

});

describe('Hiker', function() {
  let hangryBear;
  let lonelyHiker;

  beforeEach(function() {
    hangryBear = new Bear('Lucky');
    lonelyHiker = new Hiker('Kyle');
    jasmine.clock().install();
    // hangryBear.updateBearStats(lonelyHiker);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("should have a name and health level of 10 when created", function() {
    expect(lonelyHiker.name).toEqual('Kyle');
    expect(lonelyHiker.health).toEqual(10);
  });

  it("should increase berries by 1 and decrease stamina by 1 when forage is used", function() {
    lonelyHiker.berries = 4;
    lonelyHiker.forage();
    console.log(lonelyHiker);
    expect(lonelyHiker.berries).toEqual(5);
    expect(lonelyHiker.stamina).toEqual(9);
  });

  it("should decrease capture attempts and stamina by 1 when capture is attempted ", function() {
    lonelyHiker.captureAttempt();
    expect(lonelyHiker.stamina).toEqual(9);
    expect(lonelyHiker.captureAttempts).toEqual(2);
  });


});
