import { Request } from 'express';

export class RequestContext {
  private static currentRequest: any;

  static setCurrentRequest(req: any) {
    this.currentRequest = req;
  }

  static getCurrentRequest(): any {
    return this.currentRequest;
  }
}
