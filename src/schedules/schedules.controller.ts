import { Controller, Get, Param } from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get('')
  getSchedules() {
    return this.schedulesService.getSchedules();
  }

  @Get(':id')
  getScheduleById(@Param('id') id: string) {
    return this.schedulesService.getScheduleById(id);
  }
}
