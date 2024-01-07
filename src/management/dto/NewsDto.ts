/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class NewsDto {
  @IsNotEmpty({ message: 'لطفا عنوان مقاله را وارد نمایید' })
  title: string;
  @IsNotEmpty({ message: 'لطفا نویسنده مقاله را وارد نمایید' })
  authur: string;
  @IsNotEmpty({ message: 'لطفا تیتر اول مقاله را وارد نمایید' })
  first_header: string;

  category: string;

  first_body: string;

  second_header: string;

  second_body: string;

  third_header: string;

  third_body: string;

  date: string;
}
