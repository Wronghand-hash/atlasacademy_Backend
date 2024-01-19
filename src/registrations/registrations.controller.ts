import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationDto } from './dto/RegistrationDto';
import { CoopRequestDto } from './dto/CoopRequestDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  // management endpoints

  @Get('/management/info')
  getRegistrations() {
    return this.registrationsService.getRegistrations();
  }

  @Get('/management/requests')
  getRequests() {
    return this.registrationsService.getRequests();
  }

  @Get('file/:id')
  async getResume(@Res() response: Response, @Param('id') id: string) {
    const file = await this.registrationsService.getResume(id);

    response.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="file.pdf"',
    });

    response.send(file);
  }

  //user end points

  @Post('/addregistration')
  addRegistration(@Body() dto: RegistrationDto) {
    return this.registrationsService.addRegistration(dto);
  }

  @Post('/cooprequest')
  addRequest(@Body() dto: CoopRequestDto) {
    return this.registrationsService.addRequest(dto);
  }

  @Post('/attachresume')
  @UseInterceptors(FileInterceptor('file'))
  uploadFilePdf(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.registrationsService.addResume(file, body);
  }
}
