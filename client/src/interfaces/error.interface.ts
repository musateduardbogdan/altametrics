interface IError {
  property: string;
  constraints: Record<string, string>;
}

export interface IApiError {
  statusCode: number;
  message: string;
  errors?: Array<IError>;
}
