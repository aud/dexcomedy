import {BloodSugar} from './bloodsugar';
import document from 'document';

export class Notifier {
  private bloodSugar: BloodSugar;
  private notifying: boolean;
  private dismissed: boolean;

  constructor(bloodSugar: BloodSugar) {
    this.bloodSugar = bloodSugar;
    this.notifying = false;
    this.dismissed = false;
  }

  notify() {
    // if (this.notifying) {
    //   return
    // } else {
    //   this.notifying = true;
    // }

    vibration.start('nudge-max', 2000);

    // // update the clock face
    // if (this.bloodSugar.high) {
    //   // console.error("Warning, high!", this.bloodSugar.mmol)
    // } else if (this.bloodSugar.low) {
    //   // console.error("Warning, low!", this.bloodSugar.mmol)
    // }
  }

  dismiss() {
    this.dismissed = true;
  }
}
