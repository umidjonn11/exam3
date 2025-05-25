import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from './roles.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    request.user = {
      id: payload.id,
      username: payload.name,
      role: payload.role,
    };

    const user = request.user;
    console.log(user);
    

    if (!requiredRoles || requiredRoles.includes(user.role)) {
      return true;
    }

    throw new UnauthorizedException(
      `Access denied. Required role(s): ${requiredRoles.join(', ')}`,
    );
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers?.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
