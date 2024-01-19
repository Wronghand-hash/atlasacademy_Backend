/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class AnnouncementsDto {
  @IsNotEmpty({ message: 'عنوان افتخار را وارد کنید' })
  title: string;

  @IsNotEmpty({ message: 'کسب کننده افتخار را وارد کنید' })
  winner: string;
}
