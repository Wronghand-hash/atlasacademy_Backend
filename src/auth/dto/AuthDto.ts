/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty({ message: 'ایمیل خود را وارد نمایید' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'ایمیل خود را وارد نمایید' })
  password: string;

  @IsNotEmpty({ message: 'نام کاربردی خود را وارد نمایید' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'شماره همراه خود را وارد نمایید' })
  phonenumber: number;

  @IsNotEmpty({ message: 'سن فرزند خود را وارد نمایید' })
  age: number;

  @IsNotEmpty({ message: 'نام کامل فرزند خود را وارد نمایید' })
  fullname: string;
}
