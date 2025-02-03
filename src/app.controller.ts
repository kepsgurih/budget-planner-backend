import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Public } from './constants/auth.contants';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth/dto/login.dto';

@Controller()
@ApiTags('auth')
export class AppController {
  constructor(private authService: AuthService) {}

  // @Public()
  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }


  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
