/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InfoGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async validateId(id: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotAcceptableException('not a match');
    }
    if (user) {
      return {
        userId: user.id,
        userName: user.username,
        role: user.role,
      };
    }
    return true;
  }

  matchId(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    console.log('the user', user.role);
    if (!this.validateId(user.id)) {
      throw new NotAcceptableException('not a match 2');
    }

    console.log('id was a match');
    return true;
  }
}
