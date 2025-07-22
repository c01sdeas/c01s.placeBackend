import { Request, Response, NextFunction } from 'express';

declare function logMiddleware(req: Request, res: Response, next: NextFunction): void;

export default logMiddleware;