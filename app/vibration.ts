export class Vibration {
  private started: boolean;

  constructor() {
    this.started = false;
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
