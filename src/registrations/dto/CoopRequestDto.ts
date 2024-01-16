/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class CoopRequestDto {
  @IsNotEmpty({ message: 'لطفا نام کامل خود را وارد نمایید' })
  fullName: string;

  @IsNotEmpty({ message: 'لطفا نام پدر خود را وارد نمایید' })
  fatherName: string;

  @IsNotEmpty({ message: 'لطفا کد ملی خود را وارد نمایید' })
  personalId: string;

  @IsNotEmpty({ message: 'لطفا وضعیت تاهل خود را وارد نمایید' })
  status: string;

  @IsNotEmpty({ message: 'لطفا تیتر شماره همراه خود را وارد نمایید' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'لطفا تیتر شماره ثابت خود را وارد نمایید' })
  lineNumber: string;

  @IsNotEmpty({ message: 'لطفا محل تولد خود را وارد نمایید' })
  birthPlace: string;

  @IsNotEmpty({ message: 'لطفا تاریخ تولد خود را وارد نمایید' })
  birthDate: string;

  @IsNotEmpty({ message: 'لطفا ادرس فعلی خود را وارد نمایید' })
  address: string;
}
