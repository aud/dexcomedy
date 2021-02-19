export class Result {
  success: boolean;
  error: string;
  payload: any;

  static success(payload: any) {
    return new Result(true, null, payload);
  }

  static failure(error: string) {
    return new Result(false, error, null);
  }

  constructor(success, error = null, payload = null) {
    this.success = success;
    this.error = this.error ? `Error: ${error}` : null;
    this.payload = payload;
  }
}
