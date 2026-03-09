import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';
import { log } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const payload = await this.authService.checkToken(request);
      
      const user = await this.authService.findUserById(payload.id);
      if (!user) throw new UnauthorizedException('El usuario no existe');
      if (!user.isActive)
      throw new UnauthorizedException('El usuario no esta activo');
    
    request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException(error['message'] ?? 'JWT no autorizado');
    }
    return true;
  }
}
