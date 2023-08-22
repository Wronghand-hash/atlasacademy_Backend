/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  HttpCode,
  Res,
  Get,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.services';
import { AuthDto } from './dto/index';
import { LocalAuthGuard } from './localAuthGuard';
import { Response } from 'express';
import { Roles } from './decorators/role.decorator';
import { RolesGuard } from './guards/roleBase.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Get('test')
  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(LocalAuthGuard, RolesGuard)
  loggingSomrhing(@Res({ passthrough: true }) res: Response) {
    return { msg: 'only admin can visit' };
  }

  // login method
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  login(@Res({ passthrough: true }) res: Response): any {
    return {
      msg: 'User logged in',
    };
  }
}
