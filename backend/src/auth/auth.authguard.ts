import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IS_PUBLIC_KEY } from "src/utils/public.metadata";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector    
    ){}

    private extractTokenFromHeader(request: Request): string | undefined {
        const token = request.cookies.accessToken;
        return token ?? undefined;
        // const [type, token] = request.headers.authorization?.split(' ') ?? [];
        // return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

        if (isPublic)
            return (true);

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            })
            req['user'] = payload;
        } catch(e) {
            throw new UnauthorizedException();
        }
        return (true);
    }
}