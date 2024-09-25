export type IResult<T, Error = null> =
  | { ok: true; }
  | { ok: true; value: T }
  | { ok: false; }
  | { ok: false; error: Error };

export class Result {
  public static success<T>(data?: T): IResult<T> {
    return {
      ok: true,
      value: data
    };
  }

  public static failure<T>(error?: Error): IResult<T, Error> {
    return {
      ok: false,
      error
    };
  }
}