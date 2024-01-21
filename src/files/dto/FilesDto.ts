/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class FilesDto {
  @IsNotEmpty({ message: 'لطفا عنوان فایل را وارد کنید' })
  title: string;

  group: string;

  date: string;
}
