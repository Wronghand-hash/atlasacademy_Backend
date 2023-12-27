import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksDto } from './dto/BooksDto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roleBase.guard';
import { Response } from 'express';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('books')
export class BooksController {
  constructor(private readonly booksServices: BooksService) {}
  @Get('')
  getBooks() {
    return this.booksServices.getBooks();
  }

  @Get('fourbooks')
  getLastFour() {
    return this.booksServices.getLastFourBooks();
  }

  @Get(':id')
  getBooksById(@Param('id') id: string) {
    return this.booksServices.getBooksById(id);
  }

  @Get('file/:id')
  async getBookFile(@Res() response: Response, @Param('id') id: string) {
    const file = await this.booksServices.getBookFile(id);

    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="file.pdf"',
    });

    response.send(file);
  }

  @Get('/image/:id')
  getBookImage(@Param('id') id: string) {
    return this.booksServices.getBookImage(id);
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
    @Body() dto: BooksDto,
  ) {
    return this.booksServices.addBook(file, dto);
  }

  // @Roles('ADMIN') // Only admin role allowed
  // @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/bookimage')
  @UseInterceptors(FileInterceptor('file'))
  uploadBookImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg|jpg|png' })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.booksServices.addImage(file, body);
  }

  // @Roles('ADMIN') // Only admin role allowed
  // @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/bookimageremove/:id')
  removeBookImage(@Param('id') id: string) {
    return this.booksServices.removeBookImage(id);
  }

  // @Roles('ADMIN') // Only admin role allowed
  // @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/bookremove/:id')
  removeBook(@Param('id') id: string) {
    return this.booksServices.removeBook(id);
  }
}
