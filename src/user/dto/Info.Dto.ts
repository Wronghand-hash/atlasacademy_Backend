/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InfoDto {
  phonenumber: number;

  age: number;

  @IsString()
  fullname: string;

  @IsString()
  QnA: string;
}
