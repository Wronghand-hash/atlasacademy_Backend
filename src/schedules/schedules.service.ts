import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSchedules() {
    const schedules = await this.prismaService.schedule.findMany({});

    return { schedules: schedules };
  }

  async getScheduleById(id: string) {
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
        id: Number(id),
      },
    });
    return { schedule: schedule };
  }
}
