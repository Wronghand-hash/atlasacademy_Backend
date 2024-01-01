/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty({ message: 'لطفا نام کامل خود را وارد نمایید' })
  fullName: string;

  @IsNotEmpty({ message: 'لطفا تیتر شماره همراه خود را وارد نمایید' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'لطفا عنوان درخواست را وارد نمایید' })
  category: string;

  @IsNotEmpty({ message: 'لطفا تاریخ تولد خود را وارد نمایید' })
  birthDate: string;

  @IsNotEmpty({ message: 'لطفا ادرس فعلی خود را وارد نمایید' })
  address: string;
}
