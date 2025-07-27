export class BadRequestError extends Error {
  constructor(message: string = "Invalid Input Provided") {
    super(message);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = "Unauthorized Access Please Login Again") {
    super(message);
    this.name = "UnauthorizedError";
  }
}
