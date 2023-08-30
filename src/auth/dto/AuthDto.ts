/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  password: string;

  username: string;

  phonenumber: string;

  age: number;

  fullname: string;
}
