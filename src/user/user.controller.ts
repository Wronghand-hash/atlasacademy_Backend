import {
  Controller,
  Body,
  Get,
  Res,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { UserService } from './user.service';
import { InfoGuard } from './guards/info.guard';
import { Response } from 'supertest';
import { examDto } from './dto/exam.dto';
import { InfoDto } from './dto/Info.Dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  getMe() {
    return { msg: 'see me ' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/setInfo')
  setInfo(@Body() dto: InfoDto, @Session() session: Record<string, any>) {
    return this.userService.setInfo(dto, session.passport.user.userName);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/results')
  getTestResults(@Res() req: Request) {
    return { msg: req };
  }

  @UseGuards(AuthenticatedGuard, InfoGuard)
  @Get('/myinfo')
  getInfo(@Session() session: Record<string, any>): any {
    return this.userService.getTestResults(session.passport.user.userName);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/submitresults')
  submitResults(@Body() dto: examDto, @Session() session: Record<string, any>) {
    return this.userService.submitTorrence(dto, session.passport.user.userName);
  }
}
