import {
  Controller,
  Post,
  Body,
  Res,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageGalleryDto } from './dto/ImageGalleryDto';

@Controller('image-gallery')
export class ImageGalleryController {
  constructor(private readonly imageGalleryService: ImageGalleryService) {}

  @Get('')
  getGalleries() {
    return this.imageGalleryService.getGalleries();
  }

  @Get('/image/:id')
  getArticleImage(@Param('id') id: string) {
    return this.imageGalleryService.getGalleryImage(id);
  }

  @Get('/management/galleries')
  getGalleriesData() {
    return this.imageGalleryService.getManagement();
  }

  @Post('/management/addgallery')
  addArticle(@Body() dto: ImageGalleryDto) {
    return this.imageGalleryService.addGallery(dto);
  }
  @Post('/management/galleryimage')
  @UseInterceptors(FileInterceptor('file'))
  uploadNewsImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg|jpg|png' })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.imageGalleryService.addImage(file, body);
  }
}
