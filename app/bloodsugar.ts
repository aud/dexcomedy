import {mgdlToMmol} from '../common/utilities';

type WarnType = 'high' | 'low';

interface Props {
  mgdl: number;
  lowThreshold: number;
  highThreshold: number;
}

export class BloodSugar {
  private _mmol: number;
  private _lowThreshold: number;
  private _highThreshold: number;

  constructor({mgdl, lowThreshold, highThreshold}: Props) {
    this._mmol = mgdlToMmol(mgdl);
    this._lowThreshold = lowThreshold;
    this._highThreshold = highThreshold;
  }

  get warnType(): WarnType {
    if (this.high) {
      return 'high';
    } else if (this.low) {
      return 'low';
    }
  }

  get mmol() {
    return this._mmol;
  }

  get normal() {
    return !(this.high || this.low)
  }

  get high() {
    return this.mmol >= this.highThreshold;
  }

  get low() {
    return this.mmol <= this.lowThreshold;
  }

  private static get lowDefault() {
    return 4.4;
  }

  private static get highDefault() {
    return 11.1;
  }

  private get lowThreshold() {
    return this._lowThreshold || BloodSugar.lowDefault;
  }

  private get highThreshold() {
    return this._highThreshold || BloodSugar.highDefault;
  }
}
