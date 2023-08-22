import { Controller, Get, Post } from '@nestjs/common';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {
  constructor(private examService: ExamService) {}

  @Get('highschool')
  getExam() {
    return 'this is what you should see';
  }

  @Post('/submit')
  submitAnswers() {
    return this.examService.submitAnswers();
  }
}
