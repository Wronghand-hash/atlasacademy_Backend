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
import { SignupDto } from './dto/index';
import { LocalAuthGuard } from './localAuthGuard';
import { Response } from 'express';
import { Roles } from './decorators/role.decorator';
import { RolesGuard } from './guards/roleBase.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signupwithinfo')
  signupWithInfo(@Body() dto: AuthDto) {
    return this.authService.signupWithInfo(dto);
  }

  @Post('isauthenticated')
  @UseGuards(AuthenticatedGuard)
  isAuthenticated(@Res({ passthrough: true }) res: Response) {
    return { check: true };
  }

  @Post('ischeck')
  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  loggingSomrhing(@Res({ passthrough: true }) res: Response) {
    return { check: true };
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

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}
