import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth/dto/login.dto';

@Controller()
@ApiTags('auth')
export class AppController {
  constructor(private authService: AuthService) {}
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
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
