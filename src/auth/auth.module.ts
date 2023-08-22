/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocalStrategy } from './local.auth';
import { SessionSerializer } from './serializer/session.serializer';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
