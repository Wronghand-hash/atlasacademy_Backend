/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty({ message: 'لطفا عنوان مقاله را وارد نمایید' })
  title: string;
  @IsNotEmpty({ message: 'لطفا نویسنده مقاله را وارد نمایید' })
  authur: string;
  @IsNotEmpty({ message: 'لطفا تیتر اول مقاله را وارد نمایید' })
  first_header: string;
  @IsNotEmpty({ message: 'مقاله حداقل باید یک پاراگراف داشته باشد' })
  first_body: string;

  second_header: string;

  second_body: string;

  third_header: string;

  third_body: string;

  @IsNotEmpty({ message: 'لطفا تاریخ مقاله را وارد نمایید' })
  date: string;

  @IsNotEmpty({ message: 'لطفا دسته بندی مقاله را انتخاب کنید' })
  category: string;
}
