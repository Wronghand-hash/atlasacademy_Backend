/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.services';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const userName = username;
    console.log(username, 'this is dto');
    console.log(username, 'this is user name to be found somewhere ');
    const user = await this.authService.validateUser(userName, password);
    if (!user) {
      throw new ForbiddenException('نام کاربردی پیدا نشد');
    }
    if(!password){
      throw new ForbiddenException('no pass')
    }
    console.log('user found');
    return user;
  }
}
