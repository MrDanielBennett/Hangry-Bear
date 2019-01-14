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
      this.angerLevel += 1
    }
  }

  attack(hiker) {
    if(this.angerLevel >= 1) {
      hiker.health -= this.angerLevel;
      this.foodLevel += 1
    }
  }

  updateBearStats(hiker) {
    setInterval(() => {
      this.makeSleepy();
      this.foodLevel --;
      this.anger();
      this.attack(hiker);
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
    if (this.dead === true) {
      return "You're Dead."
    }
  }

  captureAttempt() {
    this.captureAttempts -= 1;
    this.stamina -= 1;
  }

  feedBear(bear) {
    if (this.berries > 0) {
    this.berries --;
    this.stamina --;
    bear.foodLevel += 1;
    } else {
      return "Uh ohhh. NO berries!";
    }
  }

  function chanceRoll(number) {
    let result = Math.floor((Math.random() * number));
    debugger;
    if (result === number) {
      return true;
    } else {
      return false;
    }
  }

  updateHikerStats() {
    setInterval(() => {
      this.stamina += 1;
      this.captureAttempts += 1;
      this.deathCheck();
    }, 5000);
  }

}
