/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class VideosDto {
  @IsNotEmpty({ message: 'لطفا تیتر ویدیو را وارد نمایید' })
  title: string;
  @IsNotEmpty({ message: 'لطفا دسته بندی ویدیو را وارد نمایید' })
  category: string;
  @IsNotEmpty({ message: 'لطفا توضیحات ویدیو را وارد نمایید' })
  description: string;
}
