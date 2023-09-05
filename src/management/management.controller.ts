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
        .addFileTypeValidator({ fileType: 'jpeg' || 'png' })
        .addMaxSizeValidator({ maxSize: 5000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.managemenetService.addImage(file);
  }

  @Post('/articleremove/:id')
  removeArticle(@Param('id') id: string) {
    return this.managemenetService.removeArticle(id);
  }
  // schedule end_Points

  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('/addschedule')
  addSchedule(@Body() dto: ScheduleDto) {
    return this.managemenetService.addSchedule(dto);
  }

  @Post('/scheduleremove/:id')
  removeSchedule(@Param('id') id: string) {
    return this.managemenetService.removeSchedule(id);
  }
}
