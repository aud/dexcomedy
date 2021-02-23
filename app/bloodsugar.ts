export class BloodSugar {
  private highThreshold: number;
  private lowThreshold: number;
  private currentBg: number;

  constructor({lowThreshold, highThreshold, currentBg}) {
    this.highThreshold = highThreshold;
    this.lowThreshold = lowThreshold;
    this.currentBg = currentBg;
  }

  get anomalyType() {
    if (this.high) return 'high';
    if (this.low) return 'low';

    throw new Error("Unknown type");
  }

  get abnormal() {
    return this.high || this.low;
  }

  get high() {
    return this.currentBg >= this.highThreshold;
  }

  get low() {
    return this.currentBg <= this.lowThreshold;
  }
}
