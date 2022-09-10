export class ErrorWithMetadata extends Error {
  public readonly meta?: Record<string, string>;
  constructor(message: string, meta?: Record<string, string>) {
    super(message);
    Object.setPrototypeOf(this, ErrorWithMetadata.prototype);
    this.name = ErrorWithMetadata.name;
    this.meta = meta;
  }
}

export class InternalError extends ErrorWithMetadata {
  public readonly meta?: Record<string, string>;
  constructor(name: string, message: string, meta?: Record<string, string>) {
    super(message, meta);
    Object.setPrototypeOf(this, InternalError.prototype);
    this.name = name;
  }
}

export class NotFoundError extends InternalError {
  public readonly meta?: Record<string, string>;
  constructor(message: string, meta?: Record<string, string>) {
    super(NotFoundError.name, message, meta);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export type ApplicationError =
  | Error
  | ErrorWithMetadata
  | InternalError
  | NotFoundError;
