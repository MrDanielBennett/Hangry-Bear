import { Hiker } from './hiker';

export class Bear {

  constructor(name) {
    this.name = name;
    this.angerLevel = 0;
    this.foodLevel = 10;
    this.sleepyLevel = 0;
    this.asleep = false;
    this.captureStatus = false;
    this.captureOdds = 0;
    this.bearMessage = "";
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
    return;
  }

  checkForSleep(){
    if (this.sleepyLevel === 10){
      this.asleep = true;
      this.angerLevel = 0;
    }

    if(this.foodLevel <= 5) {
      this.asleep = false;
    }

  }

  attack(hikerObject) {
    if(this.angerLevel >= 1) {
      hikerObject.health -= this.angerLevel;
      this.foodLevel += 1;
    }
  }

  updateBearStats(hikerObject) {
    const gameCycle = setInterval(() => {
      if (hikerObject.dead === true) {
        clearInterval(gameCycle);
        hikerObject.hikerMessage = "You got bear murdered!"
      } else if (this.captured === true) {
        clearInterval(gameCycle);
        hikerObject.hikerMessage = "You captured king denim bear!"
      }

      this.makeSleepy();
      this.checkForSleep();
      this.foodLevel --;
      this.anger();
      this.attack(hikerObject);
      this.bearStatCheck(hikerObject);

    }, 3000);
  }

  bearStatCheck(hikerObject) {
      let checkEverything = setInterval(() => {
      if(this.foodLevel > 10) {
        this.foodLevel = 10;
      } else if (this.foodLevel < 0) {
        this.foodLevel = 0;
      }

      if(this.angerLevel > 10) {
        this.angerLevel = 10;
      } else if (this.angerLevel < 0) {
        this.angerLevel = 0;
      }

      if(this.sleepyLevel > 10) {
        this.sleepyLevel = 10;
      } else if (this.sleepyLevel < 0) {
        this.sleepyLevel = 0;
      }

      this.captureOdds = hikerObject.calculateCaptureOdds(this);

      hikerObject.hikerStatCheck();
    }, 1);

  }

}
