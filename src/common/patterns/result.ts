export type IResult<T, Error = null> =
  | { ok: true; value: T }
  | { ok: false; error?: Error };

export class Result {
  public static success<T>(data?: T): IResult<T, Error> {
    if (data) {
      return {
        ok: true,
        value: data
      };
    }

    return {
      ok: true,
      value: data as T
    };
  }

  public static failure<T>(error?: Error): IResult<T, Error> {
    return {
      ok: false,
      error: error
    };
  }
}
