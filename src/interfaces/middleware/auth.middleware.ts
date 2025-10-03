import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET;

  // Essentiële controle: als er geen secret is, kunnen we niet doorgaan.
  if (!secret) {
    console.error('JWT_SECRET is niet ingesteld in het .env bestand!');
    // Gooi een serverfout, want dit is een configuratieprobleem
    return res.status(500).json({ message: 'Server configuratiefout.' });
  }

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Nu weet TypeScript 100% zeker dat 'secret' een string is
      const decoded = jwt.verify(token, secret);

      if (typeof decoded === 'object' && 'id' in decoded) {
        req.user = { id: (decoded as { id: string }).id };
        next();
      } else {
        throw new Error('Token is ongeldig');
      }
    } catch (error) {
      return res.status(401).json({ message: 'Niet geautoriseerd, token is mislukt' });
    }
  } else {
    return res.status(401).json({ message: 'Niet geautoriseerd, geen token' });
  }
};