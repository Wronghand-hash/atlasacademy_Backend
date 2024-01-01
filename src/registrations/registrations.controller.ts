import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationDto } from './dto/RegistrationDto';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Get('/management/info')
  getRegistrations() {
    return this.registrationsService.getRegistrations();
  }

  @Post('/addregistration')
  addRegistration(@Body() dto: RegistrationDto) {
    return this.registrationsService.addRegistration(dto);
  }
}
