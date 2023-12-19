/* eslint-disable prettier/prettier */
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
      select: {
        id: true,
        title: true,
        description: true,
        image_buffer: true,
        file: true,
      },
    });

    return { videos: videos };
  }

  async getLatestVideo() {
    const video = await this.prismaService.videos.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 1,
      select: {
        id: true,
        title: true,
        description: true,
        image_buffer: true,
        file: false,
      },
    });

    return { video: video };
  }

  async getVideoDetails() {
    const videos = await this.prismaService.videos.findMany({
      orderBy: {
        id: 'desc',
      },
      skip: 1,
      select: {
        id: true,
        title: true,
        description: true,
        image_buffer: true,
      },
    });
    return { videos: videos };
  }

  async getVideoById(id: string) {
    const video = await this.prismaService.videos.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        file: true,
      },
    });
    return { video: video };
  }
}
