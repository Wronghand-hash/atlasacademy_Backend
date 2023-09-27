/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty({ message: 'ّلطفا آدرس ایمیل خود را وارد نمایید' })
  email: string;

  @IsNotEmpty({ message: 'ّلطفا گذرواژه را وارد نمایید' })
  password: string;

  @IsNotEmpty({ message: 'ّلطفا نام کاربری را وارد نمایید' })
  username: string;
}
