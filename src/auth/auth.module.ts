import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth.contants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtWsStrategy } from './strategy/jwt-ql.strategy';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtWsStrategy],
  exports: [AuthService],
})
export class AuthModule {}
