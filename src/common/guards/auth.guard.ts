import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../config/database/prisma.service';

export const IS_PUBLIC_KEY = 'isPublic';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      // Verify session token from database (Better Auth stores sessions in DB)
      const sessionData = await this.prisma.session.findUnique({
        where: { token },
        include: {
          user: {
            include: {
              role: true,
            },
          },
        },
      });

      if (!sessionData) {
        throw new UnauthorizedException('Invalid session token');
      }

      // Check if session is expired
      if (sessionData.expiresAt < new Date()) {
        throw new UnauthorizedException('Session expired');
      }

      // Attach user session to request
      request['session'] = sessionData;
      request['userId'] = sessionData.userId;
      request['user'] = sessionData.user;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
