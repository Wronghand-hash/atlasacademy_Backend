import {
  Controller,
  Get,
  Param,
  Res,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Body,
  HttpStatus,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { AudioBooksService } from './audio-books.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AudioBooksDto } from './dto/AudioBooksDto';
import { promisify } from 'util';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('audio-books')
export class AudioBooksController {
  constructor(private readonly audioBooksService: AudioBooksService) {}
  @Get('')
  getBooks() {
    return this.audioBooksService.getBooks();
  }

  @Get('fourbooks')
  getLastFour() {
    return this.audioBooksService.getLastFourBooks();
  }

  @Get(':id')
  getBooksById(@Param('id') id: string) {
    return this.audioBooksService.getBooksById(id);
  }

  @Get('/image/:id')
  getBookImage(@Param('id') id: string) {
    return this.audioBooksService.getBookImage(id);
  }

  // books management

  @Post('/management/addbook')
  @UseInterceptors(FileInterceptor('file'))
  uploadFilePdf(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
    @Body() dto: AudioBooksDto,
  ) {
    return this.audioBooksService.addBook(file, dto);
  }

  // @Roles('ADMIN') // Only admin role allowed
  // @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/bookimage')
  @UseInterceptors(FileInterceptor('file'))
  uploadBookImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg|jpg|png' })
        .addMaxSizeValidator({ maxSize: 1500000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.audioBooksService.addImage(file, body);
  }

  // @Roles('ADMIN') // Only admin role allowed
  // @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/bookimageremove/:id')
  removeBookImage(@Param('id') id: string) {
    return this.audioBooksService.removeBookImage(id);
  }

  // @Roles('ADMIN') // Only admin role allowed
  // @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/bookremove/:id')
  removeBook(@Param('id') id: string) {
    return this.audioBooksService.removeBook(id);
  }

  @Get('/gettrack/:id')
  @Header('Content-Type', 'application/octet-stream')
  @Header('Transfer-Encoding', 'chunked')
  async getFile(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.audioBooksService.getTrack('id');
    res.set({
      'Content-Disposition': `attachment; filename=${file.filename}`,
      'Transfer-Encoding': 'chunked',
      'X-Content-Type-Options': 'nosniff',
    });
    const track = createReadStream(join(process.cwd(), file.file));
    return new StreamableFile(track);
  }
}
