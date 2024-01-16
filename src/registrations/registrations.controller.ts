import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationDto } from './dto/RegistrationDto';
import { CoopRequestDto } from './dto/CoopRequestDto';

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

  @Get('/management/requests')
  getRequests() {
    return this.registrationsService.getRequests();
  }

  @Post('/cooprequest')
  addRequest(@Body() dto: CoopRequestDto) {
    return this.registrationsService.addRequest(dto);
  }
}
