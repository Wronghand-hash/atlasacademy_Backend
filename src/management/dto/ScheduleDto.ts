/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class ScheduleDto {
  @IsNotEmpty({ message: 'لطفا نام برنامه را وارد نمایید' })
  title: string;

  category: string;

  schedule_id: string;
}
