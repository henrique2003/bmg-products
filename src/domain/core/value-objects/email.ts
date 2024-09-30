export class Email {
  private static readonly regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  public static isValid(value: string): boolean {
    return Email.regex.test(value);
  }
}
