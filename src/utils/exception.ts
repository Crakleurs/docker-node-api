import {ApiException} from "~~/types/exception";

export class HttpException implements ApiException {
  constructor(readonly error: any, readonly status: number) {}
}


export class NotFoundException extends HttpException {

  constructor(error: any) {
    super(error, 404)
  }
}

export class BadRequestException extends HttpException {

  constructor(error: any) {
    super(error, 400)
  }
}
