/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty({ message: 'ّلطفا آدرس ایمیل خود را وارد نمایید' })
  email: string;

  @IsNotEmpty({ message: 'ّلطفا گذرواژه را وارد نمایید' })
  password: string;

  @IsNotEmpty({ message: 'ّلطفا نام کاربری را وارد نمایید' })
  username: string;

  @IsNotEmpty({ message: 'ّلطفا شماره همراه خود را وارد نمایید' })
  phonenumber: string;

  @IsNotEmpty({ message: 'ّلطفا سن فرزند خود را وارد نمایید' })
  age: number;

  @IsNotEmpty({ message: 'ّلطفا نام فرزند خود را وارد نمایید' })
  fullname: string;
}
