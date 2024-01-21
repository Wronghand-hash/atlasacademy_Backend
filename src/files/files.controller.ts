import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilesDto } from './dto/FilesDto';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Get('')
  getBooks() {
    return this.fileService.getFiles();
  }
  @Get(':id')
  getBooksById(@Param('id') id: string) {
    return this.fileService.getFileById(id);
  }

  @Get('/bycategory/:category')
  getFilesByCategory(@Param('category') category: string) {
    console.log('corecto cuz');
    return this.fileService.byCategory(category);
  }

  @Get('file/:id')
  async getBookFile(@Res() response: Response, @Param('id') id: string) {
    const file = await this.fileService.getFile(id);

    response.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${file.filename}`,
    });

    response.send(file.file);
  }

  // file management

  @Post('/management/addfile')
  @UseInterceptors(FileInterceptor('file'))
  uploadFilePdf(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
    @Body() dto: FilesDto,
  ) {
    return this.fileService.addFile(file, dto);
  }

  // @Roles('ADMIN') // Only admin role allowed
  // @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/management/removefile/:id')
  removeBook(@Param('id') id: string) {
    return this.fileService.removeFile(id);
  }
}
