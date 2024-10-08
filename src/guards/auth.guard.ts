import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

function validateRequest(req: any) {
  console.log(req.headers['authorization']);
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return false;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return false;
  }
  console.log(req.user);
  if (!req.user) {
    return false;
  }
  return true;
}
