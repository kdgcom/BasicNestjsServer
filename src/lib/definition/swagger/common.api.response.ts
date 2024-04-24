/**
 * ApiCommonResponse
 * controller의 기본 리턴 타입을 맞춰 주기 위한 decorator
 * 
 * 
 * 참고 : https://velog.io/@debug/NestJS-Swagger-Common-Response-Type-%EC%84%A4%EC%A0%95
 */
import { applyDecorators } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ResponseCode } from '../response/responseCode';

export const ApiCommonAcceptedResponse = (
  obj: SchemaObject & Partial<ReferenceObject>,
) => ApiCommonResponse(obj, ApiAcceptedResponse)
  {
}

export const ApiCommonCreatedResponse = (
  obj: SchemaObject & Partial<ReferenceObject>,
) => ApiCommonResponse(obj, ApiCreatedResponse)
  {
}

export const ApiCommonOKResponse = (
  obj: SchemaObject & Partial<ReferenceObject>,
) => ApiCommonResponse(obj, ApiOkResponse)
  {
}

export const ApiCommonResponse = (
  obj: SchemaObject & Partial<ReferenceObject>,
  which: number | Function
) => {
  let func:Function = ApiOkResponse;
  if ( typeof which==="number" )
  {
    if ( which===ResponseCode.ACCEPTED )
      func = ApiAcceptedResponse;
    else if ( which===ResponseCode.CREATED )
      func = ApiCreatedResponse;
  }
  else
    func = which;
  return applyDecorators(
    func({
      schema: {
        properties: {
          data: {
            ...obj,
          },
          success: {
            type: "boolean" || "string",
            example: "true"
          },
          statusCode: {
            type: "string",
            example: "200"
          },
          message: {
            type: "string",
            example: "OK"
          },
          error: {
            type: "string",
            example: "Unauthorized"
          },
        },
      },
    }),
  );
};