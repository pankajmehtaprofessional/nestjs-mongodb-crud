export class ResponseDto<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(data: T, statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
