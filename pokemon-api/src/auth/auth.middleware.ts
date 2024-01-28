import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
 
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly hardcodedToken = '123456789123456789123456789';
 
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
 
    if (!token || token !== `Bearer ${this.hardcodedToken}`) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    next();
  }
}