/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videoService: VideosService) {}

  @Get('')
  getVideos() {
    return this.videoService.getAllVideos();
  }

  @Get('/category/:category')
  getVideosByCategory(@Param('category') category: string) {
    console.log('corecto cuz');
    return this.videoService.getVideosByCategory(category);
  }

  @Get('/videos')
  getVideoDetail() {
    return this.videoService.getVideoDetails();
  }

  @Get('/latest')
  getLatest() {
    return this.videoService.getLatestVideo();
  }

  @Get(':id')
  getVideoById(@Param('id') id: string) {
    return this.videoService.getVideoById(id);
  }
}
