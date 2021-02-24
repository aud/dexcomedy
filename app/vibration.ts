export class Vibration {
  private started: boolean;

  constructor() {
    this.started = false;
  }

  get recentlyDismissed() {
  }

  start() {
    console.error("Starting vibration")
    this.started = true;
  }

  stop() {
    console.error("Stopping vibration")
    this.started = false;
  }
}
