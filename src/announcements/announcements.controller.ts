import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsDto } from './dto/AnnouncementsDto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roleBase.guard';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get('')
  getAnnouncements() {
    return this.announcementsService.getAnnouncements();
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/addannouncements')
  addSchedule(@Body() dto: AnnouncementsDto) {
    return this.announcementsService.addAnnouncements(dto);
  }
}
