import { Hiker } from './hiker';

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
    return;
  }

  checkForSleep(){
    if (this.sleepyLevel === 10){
      this.asleep = true;
      this.anger = 0;
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
      this.checkForSleep();
      this.foodLevel --;
      this.anger();
      this.attack(hikerObject);
    }, 3000);
  }

}
