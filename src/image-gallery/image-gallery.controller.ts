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
  UseGuards,
} from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageGalleryDto } from './dto/ImageGalleryDto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roleBase.guard';

@Controller('image-gallery')
export class ImageGalleryController {
  constructor(private readonly imageGalleryService: ImageGalleryService) {}

  @Get('')
  getGalleries() {
    return this.imageGalleryService.getGalleries();
  }
  @Get('/bycategory/:category')
  getGalleryByCategory(@Param('category') category: string) {
    console.log('corecto cuz');
    return this.imageGalleryService.byCategory(category);
  }
  @Get('/image/:id')
  getArticleImage(@Param('id') id: string) {
    return this.imageGalleryService.getGalleryImage(id);
  }

  @Get('/gallery/:id')
  getGalleryById(@Param('id') id: string) {
    return this.imageGalleryService.getGalleryById(id);
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

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/galleryimageremove/:id')
  removeGalleryImage(@Param('id') id: string) {
    return this.imageGalleryService.removeGalleryImage(id);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/galleryremove/:id')
  removeGallery(@Param('id') id: string) {
    return this.imageGalleryService.removeGallery(id);
  }
}
