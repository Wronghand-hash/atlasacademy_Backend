/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotAcceptableException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthDto } from './dto/index';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          password: hash,
        },
      });
      return null;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials already in use');
        }
        throw error;
      }
    }
  }

  async signupWithInfo(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          password: hash,
          age: Number(dto.age),
          name: dto.fullname,
          phoneNumber: Number(dto.phonenumber),
        },
      });
      return null;
    } catch (error) {
      if (error) {
        throw new ForbiddenException('something went wrong');
      }
    }
  }

  async getUser(userName: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: userName,
      },
    });
    if (!user) {
      throw new ForbiddenException('incorrect credentials');
    }
    return user;
  }

  async getRole(userName: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: userName,
      },
    });

    return user.role;
  }

  async validateUser(userName: string, password: string): Promise<any> {
    console.log(userName, password);
    const user = await this.prisma.user.findUnique({
      where: {
        username: userName,
      },
    });
    const pwMatch = await argon.verify(user.password, password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && pwMatch) {
      return {
        userId: user.id,
        userName: user.username,
        role: user.role,
      };
    }
    return null;
  }

  // async signin(dto: AuthDto) {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: dto.email,
  //     },
  //   });
  //   if (!user) {
  //     throw new ForbiddenException('incorrect credentials');
  //   }

  //   const pwMatch = await argon.verify(user.password, dto.password);
  // }
}
