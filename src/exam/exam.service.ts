import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamService {
  submitAnswers() {
    return { msg: 'what should we do with the answers' };
  }

  getQuestions() {
    const questions = [
      {
        Q1: 'where the wild things happen?',
        c1: 'new orlands',
        c2: 'dont bother writign we should get these from database',
      },
      {
        Q1: 'something different?',
        c1: 'new land',
        c2: 'my chain ma watch ',
      },
    ];
    return questions;
  }
}
