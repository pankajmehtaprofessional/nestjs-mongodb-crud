import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import * as CONSTANT from '../../constants';

@Injectable()
export class ResponseService {
  success<T>(data: T): ResponseDto<T> {
    return new ResponseDto<T>(
      data,
      CONSTANT.HTTP_CODE.OK,
      CONSTANT.HTTP_MESSAGE.OK,
    );
  }

  error(message: string): ResponseDto<string> {
    return new ResponseDto<string>(
      message,
      CONSTANT.HTTP_CODE.ERROR,
      CONSTANT.HTTP_MESSAGE.ERROR,
    );
  }
}
