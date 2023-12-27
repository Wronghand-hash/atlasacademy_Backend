import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnnouncementsDto } from './dto/AnnouncementsDto';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAnnouncements() {
    const announcements = await this.prismaService.announcements.findMany({});
    return { announcements: announcements };
  }

  async addAnnouncements(dto: AnnouncementsDto) {
    const announcements = await this.prismaService.announcements.create({
      data: {
        title: dto.title,
        winner: dto.winner,
      },
    });
    return { msg: 'افتخار اضافه شد', announcements: announcements };
  }
}
