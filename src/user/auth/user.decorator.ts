import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const getUser = createParamDecorator(
    (data:any, context:ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        return req.user;
    }
)