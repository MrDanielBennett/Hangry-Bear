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

  deathCheck() {
    if (this.health <= 0) {
      this.dead = true;
    }
  }

  captureAttempt(bearObject) {
    this.captureAttempts -= 1;
    this.stamina -= 1;

    let sleepStatus = 0;
      if (bearObject.asleep === true) {
        sleepStatus = 10;
      }
    let angerLevel = bearObject.angerLevel;
    let foodLevel = bearObject.foodLevel;
    let sleepiness = bearObject.sleepiness;
    let chanceModifier = this.calculateCaptureOdds(bearObject);
    let captureSuccess = this.chanceRoll(chanceModifier)

    if(captureSuccess === false) {
      bearObject.asleep = false;
      bearObject.sleepiness = 0;
      bearObject.attack(this);
      console.log("The bear attacked you!!")
    } else if (captureSuccess === true) {
      bearObject.captured = true;
      console.log("You won the bear. Good bear, team!")
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
    let rangeArray = [...Array(number).keys()];
    let result = Math.floor((Math.random() * 100));
    if (rangeArray.includes(result)) {
      return true;
    } else {
      return false;
    }
  }

  calculateCaptureOdds(bearObject) {
    let sleepStatus = 0;
      if(bearObject.asleep === true) {
        sleepStatus = 10;
      }
    let bearHunger = bearObject.foodLevel;
    let bearSleepiness = bearObject.sleepyLevel;
    let bearAnger = bearObject.angerLevel;
    let oddsFloat = ((((sleepStatus + bearHunger + bearSleepiness) - bearAnger)/30) * 100);
    let oddsInteger = Math.round(oddsFloat);

    return oddsInteger;
  }


  testRolls(number) {
    let success = 0;
    for (let i = 0; i < 10000; i++) {
      let result = this.chanceRoll(number);
      if (result === true) {
        success += 1;
      }
    }
    let percentage = (success / 10000);
    return percentage;
  }

  updateHikerStats() {
    const hikerCycle = setInterval(() => {
      this.stamina += 1;
      this.captureAttempts += 1;
      this.deathCheck();
      this.hikerStatCheck();
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
  }

}
