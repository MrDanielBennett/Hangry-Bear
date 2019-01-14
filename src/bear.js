export class Bear {

  constructor(name) {
    this.name = name;
    this.angerLevel = 0;
    this.foodLevel = 10;
    this.sleepyLevel = 0;
    this.asleep = false;
    this.captureStatus = false;
  }

  makeSleepy() {
    if(this.foodLevel > 8){
      this.sleepyLevel += 1;
    }
  }

  anger() {
    if (this.foodLevel === 0) {
      this.angerLevel += 5;
    } else if (this.foodLevel < 5) {
      this.angerLevel += 1;
    }
  }

  attack(hikerObject) {
    if(this.angerLevel >= 1) {
      hikerObject.health -= this.angerLevel;
      this.foodLevel += 1;
    }
  }

  updateBearStats(hikerObject) {
    setInterval(() => {
      this.makeSleepy();
      this.foodLevel --;
      this.anger();
      this.attack(hikerObject);
    }, 3000);
  }

}


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

  forage() {
    this.berries += 1;
    this.stamina -= 1;
    this.foraging = true;
    setTimeout(() => {
      this.foraging = false;
    }, 5000);
  }

  forageCheck() {
    if (this.foraging === true) {
      return "You're busy...";
    }
  }

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
        bearObject.sleepiness = 0;
        console.log("You woke the bearObject!");
      } else {
        bearObject.captureStatus = true;
        console.log("You captured the bearObject!");
      }
    } else if (bearObject.angerLevel < 5 && bearObject.asleep === false){
      chanceModifier = 5;
      if (this.chanceRoll(chanceModifier) === false) {
        bearObject.anger += 1;
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
        bearObject.anger += 2;
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
    setInterval(() => {
      this.stamina += 1;
      this.captureAttempts += 1;
      this.deathCheck();
    }, 5000);
  }

}
