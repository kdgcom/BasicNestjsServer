/**
 * ApiCommonResponse
 * 
 * 참고 : https://velog.io/@debug/NestJS-Swagger-Common-Response-Type-%EC%84%A4%EC%A0%95
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiCommonResponse = (
  obj: SchemaObject & Partial<ReferenceObject>,
) => {
  return applyDecorators(
    ApiOkResponse({
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