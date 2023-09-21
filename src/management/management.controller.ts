import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/decorators/role.enum';
import { LocalAuthGuard } from 'src/auth/localAuthGuard';
import { ManagementService } from './management.service';
import { ArticleDto } from './dto/ArticleDto';
import { ScheduleDto } from './dto/ScheduleDto';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roleBase.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { VideosDto } from './dto/VideoDto';

@Controller('management')
export class ManagementController {
  constructor(private readonly managemenetService: ManagementService) {}

  //user end_Points

  @Get('getusers')
  @Roles('ADMIN')
  @UseGuards(LocalAuthGuard)
  getAllUsers() {
    return { msg: 'list of users' };
  }

  @Get('getAllTestResults')
  @Roles('ADMIN')
  @UseGuards(LocalAuthGuard)
  getTestResults() {
    return { msg: 'this is all the results' };
  }

  // article end_Points

  @Post('/addarticle')
  addArticle(@Body() dto: ArticleDto) {
    return this.managemenetService.addArticle(dto);
  }

  @Post('articleimage')
  @UseInterceptors(FileInterceptor('file'))
  uploadArticleFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg|jpg|png' })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.managemenetService.addImage(file, body);
  }

  @Post('articleimageremove/:id')
  removeArticleImage(@Param('id') id: string) {
    return this.managemenetService.removeArticleImage(id);
  }

  @Post('/articleremove/:id')
  removeArticle(@Param('id') id: string) {
    return this.managemenetService.removeArticle(id);
  }

  // article image delete

  // schedule end_Points

  @Post('/addschedule')
  addSchedule(@Body() dto: ScheduleDto) {
    return this.managemenetService.addSchedule(dto);
  }

  @Post('scheduleimage')
  @UseInterceptors(FileInterceptor('file'))
  uploadScheduleImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg' || 'png' })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.managemenetService.addScheduleImage(file, body);
  }

  @Post('/scheduleremove/:id')
  removeSchedule(@Param('id') id: string) {
    return this.managemenetService.removeSchedule(id);
  }

  // video management
  @Post('/addvideo')
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
    dto: VideosDto,
  ) {
    return this.managemenetService.addVideo(file, dto);
  }
}
