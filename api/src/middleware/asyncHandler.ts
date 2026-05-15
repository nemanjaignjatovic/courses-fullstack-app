import type { NextFunction, Request, Response } from 'express';

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

/*
  Express route handlers often use async/await.

  If an async route throws an error, this helper catches it and sends it to the
  global error handler in app.ts. This avoids repeating try/catch in every route.
*/
export function asyncHandler(handler: AsyncRouteHandler) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
