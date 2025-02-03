
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async login(email: string, password: string): Promise<AuthEntity> {

    // Step 1: Fetch a user with the given email

    const user = await this.prisma.user.findUnique({ where: { email: email } });


    // If no user is found, throw an error

    if (!user) {

      throw new NotFoundException(`No user found for email: ${email}`);

    }


    // Step 2: Check if the password is correct

    const isPasswordValid = user.password === password;


    // If password does not match, throw an error

    if (!isPasswordValid) {

      throw new UnauthorizedException('Invalid password');

    }


    // Step 3: Generate a JWT containing the user's ID and return it

    return {

      accessToken: this.jwtService.sign({ userId: user.id }),

    };

  }
}
