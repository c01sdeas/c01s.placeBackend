import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { tokenSecretKey } from '../../domains/user/authentication/authService.js';
import { userAuthLogSchemaExport } from '../../domains/user/authentication/authModel.js';

const authCrudMiddleware = (requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authLog = userAuthLogSchemaExport;
    const token = req.headers['authorization'];

    try {
      if (token && tokenSecretKey) {
        const decodedToken: any = await new Promise((resolve, reject) => {
          jwt.verify(token, tokenSecretKey, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
          });
        });

        if (!req.session) return res.status(500).json({ error: 'Session is not initialized' });
        const sessionUsername = req.session.username;
        if (sessionUsername == null || sessionUsername === '') {
          return res.status(401).json({ error: 'Access denied.3333' });
        }

        const userLog = await authLog.findOne({ username: decodedToken.username });

        if (!userLog) return res.status(401).json({ error: 'Access denied.0' });

        if (userLog.token !== token) return res.status(401).json({ error: 'Access denied.1' });

        if (userLog.username !== sessionUsername) return res.status(401).json({ error: 'Access denied.2' });

        return next();

      } else if (requiredRoles.includes('visitor')) {
        return next();
      } else {
        return res.status(401).json({ error: 'Access denied.4' });
      }

    } catch (err) {
      return res.status(401).json({ error: 'Session has expired or token is invalid.' });
    }
  };
};

export default authCrudMiddleware;