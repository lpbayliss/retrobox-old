export class ErrorWithMetadata extends Error {
  public readonly meta?: any;
  constructor(message: string, meta?: any) {
    super(message);
    Object.setPrototypeOf(this, ErrorWithMetadata.prototype);
    this.name = ErrorWithMetadata.name;
    this.meta = meta;
  }
}

export class InternalError extends ErrorWithMetadata {
  public readonly meta?: any;
  constructor(name: string, message: string, meta?: any) {
    super(message, meta);
    Object.setPrototypeOf(this, InternalError.prototype);
    this.name = name;
  }
}

export class NotFoundError extends InternalError {
  public readonly meta?: any;
  constructor(message: string, meta?: any) {
    super(message, meta);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.name = NotFoundError.name;
  }
}

export type ApplicationError =
  | Error
  | ErrorWithMetadata
  | InternalError
  | NotFoundError;
