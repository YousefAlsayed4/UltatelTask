import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express'; // Import the Request type from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {} // Corrected the JwtService injection case

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('InvalidToken');
    }
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('InvalidToken');
    }
  }

  extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }
}
