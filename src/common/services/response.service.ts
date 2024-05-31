import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class ResponseService {
  success<T>(data: T, message = 'Request successful'): ResponseDto<T> {
    return new ResponseDto<T>(true, message, data);
  }

  error(message: string): ResponseDto<null> {
    return new ResponseDto<null>(false, message, null);
  }
}
