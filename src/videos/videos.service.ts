import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllVideos() {
    const videos = await this.prismaService.videos.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return { videos: videos };
  }

  async getVideoById(id: string) {
    const video = await this.prismaService.videos.findUnique({
      where: {
        id: Number(id),
      },
    });
    return { video: video, file: video.file };
  }
}
