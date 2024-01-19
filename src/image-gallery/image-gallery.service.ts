import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageGalleryDto } from './dto/ImageGalleryDto';

@Injectable()
export class ImageGalleryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getGalleries() {
    const galleries = await this.prismaService.imageGallery.findMany({
      select: {
        id: true,
        title: true,
        GalleryImages: { select: { id: true } },
        date: true,
        category: true,
      },
    });
    return { imageGalleries: galleries };
  }

  async byCategory(category: string) {
    const galleries = await this.prismaService.imageGallery.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        category: category,
      },
      select: {
        id: true,
        title: true,
        category: true,
        date: true,
        GalleryImages: { take: 1 },
      },
    });
    return { galleries: galleries };
  }

  async getGalleryById(id: string) {
    const gallery = await this.prismaService.imageGallery.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        GalleryImages: { select: { id: true } },
        date: true,
        category: true,
      },
    });

    return { gallery: gallery };
  }

  async getManagement() {
    const galleries = await this.prismaService.imageGallery.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        GalleryImages: { select: { id: true } },
      },
    });
    return { imageGalleries: galleries };
  }

  async addGallery(dto: ImageGalleryDto) {
    console.log(dto);
    const gallery = await this.prismaService.imageGallery.create({
      data: {
        title: dto.title,
        date: dto.date,
        category: dto.category,
      },
    });
    return { msg: 'گالری اضافه شد', gallery: gallery };
  }

  async addImage(file: any, body: any) {
    console.log(body);
    const image = await this.prismaService.galleryImages.create({
      data: {
        file: file.buffer.toString('base64'),
        gallery_id: Number(body.galleryId),
      },
    });

    return { msg: 'عکس اضافه شد' };
  }

  async getGalleryImage(id: string) {
    const image = await this.prismaService.galleryImages.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!image) {
      return new ForbiddenException('image not found');
    }
    const imageDataURL = `data:image/jpeg;base64,${image.file}`;
    return { image: imageDataURL };
  }

  async removeGalleryImage(id: string) {
    const image = await this.prismaService.galleryImages.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'عکس حذف گردید' };
  }

  async removeGallery(id: string) {
    const gallery = await this.prismaService.imageGallery.delete({
      where: {
        id: Number(id),
      },
    });

    return { msg: 'گالری حذف گردید ' };
  }
}
