/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class ImageGalleryDto {
  @IsNotEmpty({ message: 'لطفا عنوان گالری را وارد کنید' })
  title: string;

  @IsNotEmpty({ message: 'لطفا دسته بندی گالری را وارد کنید' })
  category: string;

  date: string;
}
