import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsDto } from './dto/AnnouncementsDto';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get('')
  getAnnouncements() {
    return this.announcementsService.getAnnouncements();
  }

  @Post('/management/addannouncements')
  addSchedule(@Body() dto: AnnouncementsDto) {
    return this.announcementsService.addAnnouncements(dto);
  }
}
