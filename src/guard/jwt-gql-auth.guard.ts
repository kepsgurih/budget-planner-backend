import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtWSGuard extends AuthGuard('jwt-ws') implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    if (err || !user) {
      throw new WsException('Unauthorized');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    client.data.user = user;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}
