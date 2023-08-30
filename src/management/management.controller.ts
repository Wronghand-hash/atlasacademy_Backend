import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/decorators/role.enum';
import { LocalAuthGuard } from 'src/auth/localAuthGuard';

@Controller('management')
export class ManagementController {
  @Get('getusers')
  @Roles('ADMIN')
  @UseGuards(LocalAuthGuard)
  getAllUsers() {
    return { msg: 'list of users' };
  }

  @Get('getAllTestResults')
  @Roles('ADMIN')
  @UseGuards(LocalAuthGuard)
  getTestResults() {
    return { msg: 'this is all the results' };
  }
}
