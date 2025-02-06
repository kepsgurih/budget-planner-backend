import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from 'src/constants/auth.contants';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtWsStrategy extends PassportStrategy(Strategy, 'jwt-ws') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (client: any) => {
          // Cek di headers
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (client.handshake.headers.authorization) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const token = client.handshake.headers.authorization.split(' ')[1];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return token;
          }
          // Cek di query parameter
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (client.handshake.query.token) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
            return client.handshake.query.token;
          }
          return null;
        },
      ]),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.usersService.findOne(payload.userId);
    if (!user) {
      throw new WsException('Unauthorized');
    }
    return user;
  }
}
