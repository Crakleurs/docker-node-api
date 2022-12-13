import {ApiException} from "~~/types/exception";

class Exception implements ApiException {
  constructor(readonly error: any, readonly status: number) {}
}


export class NotFoundException extends Exception {

  constructor(error: any) {
    super(error, 404)
  }
}

export class BadRequestException extends Exception {

  constructor(error: any) {
    super(error, 400)
  }
}
