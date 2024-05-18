import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export const Headers = createParamDecorator( (data: string, ctx: ExecutionContext) =>
    {
        const request = ctx.switchToHttp().getRequest();
        return data ? request.Headers?.[data] : request.Headers;
    }
  );