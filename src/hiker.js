import { Bear } from './bear';

export class Hiker {

  constructor(name) {
    this.name = name;
    this.health = 10;
    this.stamina = 10;
    this.berries = 5;
    this.captureAttempts = 3;
    this.dead = false;
    this.foraging = false;

  }

  //gets more berries, uses stamina. Sets 'foraging' to true
  forage() {
    if(this.foraging === true) {
      return "You're still tired from your last forage."
    }
    this.berries += 1;
    this.stamina -= 1;
    this.foraging = true;
    setTimeout(() => {
      this.foraging = false;
    }, 5000);
  }

  // forageCheck() {
  //   if (this.foraging === true) {
  //     return "You're busy...";
  //   }
  // }

  deathCheck() {
    if (this.health <= 0) {
      this.dead = true;
      return "You're Dead.";
    }
  }

  captureAttempt(bearObject) {
    this.captureAttempts -= 1;
    this.stamina -= 1;
    let chanceModifier = 0;

    if (bearObject.asleep === true && bearObject.foodLevel === 10 && bearObject.angerLevel === 0) {
      chanceModifier = 3;
      if (this.chanceRoll(chanceModifier) === false) {
        bearObject.asleep = false;
        bearObject.sleepyLevel = 0;
        console.log("You woke the bearObject!");
      } else {
        bearObject.captureStatus = true;
        console.log("You captured the bearObject!");
      }
    } else if (bearObject.angerLevel < 5 && bearObject.asleep === false){
      chanceModifier = 5;
      if (this.chanceRoll(chanceModifier) === false) {
        bearObject.angerLevel += 1;
        bearObject.attack(this);
        this.deathCheck();
        console.log("You've been bearObject attacked!");
      } else {
        bearObject.captureStatus = true;
        console.log("You captured the bear!");
      }
    } else if (bearObject.angerLevel > 5 && bearObject.asleep === false){
      chanceModifier = 20;
      if(this.chanceRoll(chanceModifier) === false) {
        bearObject.angerLevel += 2;
        bearObject.attack(this);
        this.deathCheck();
        console.log("You've been bearObject attacked!");
      } else {
        bearObject.captureStatus = true;
        console.log("You captured the bear!");
      }
    }
  }

  feedBear(bearObject) {
    if (this.berries > 0) {
      this.berries --;
      this.stamina --;
      bearObject.foodLevel += 1;
    } else {
      return "Uh ohhh. NO berries!";
    }
  }

  chanceRoll(number) {
    let result = Math.floor((Math.random() * number));
    if (result === (number - 1)) {
      return true;
    } else {
      return false;
    }
  }

  testRolls(number) {
    let success = 0;
    for (let i = 0; i < 1000; i++) {
      let result = this.chanceRoll(number);
      if (result === true) {
        success += 1;
      }
    }
    let percentage = (success / 1000);
    return percentage;
  }

  updateHikerStats() {
    const hikerCycle = setInterval(() => {
      this.stamina += 1;
      this.captureAttempts += 1;
      this.deathCheck();
      // if (this.dead === true) {
      //   alert("you deD");
      // }
      if (this.dead === true) {
        clearInterval(hikerCycle);
        console.log("Hiker Cycle Stopped (for reasons of, you are dead)");
      }
    }, 5000);
  }

  hikerStatCheck() {
    setInterval(() => {
      if(this.stamina > 10) {
        this.stamina = 10;
      } else if (this.stamina < 0) {
        this.stamina = 0;
      }

      if(this.health > 10) {
        this.health = 10;
      } else if (this.health < 0) {
        this.health = 0;
      }

      if(this.berries > 5) {
        this.berries = 5;
      } else if (this.berries < 0) {
        this.berries = 0;
      }

      if(this.captureAttempts > 3) {
        this.captureAttempts = 3;
      } else if (this.captureAttempts < 0) {
        this.captureAttempts = 0;
      }

    }, 1);
  }

}
