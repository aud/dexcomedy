export class Result {
  success: boolean;
  error: string;
  payload: any;

  static success(payload: any) {
    return new Result(true, null, payload);
  }

  static failure(error: Error) {
    return new Result(false, error.message, null);
  }

  constructor(success, error = null, payload = null) {
    this.success = success;
    this.error = error || null;
    this.payload = payload;
  }
}
