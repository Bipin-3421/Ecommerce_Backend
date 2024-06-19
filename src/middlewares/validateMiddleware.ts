import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

const validateBody =
  (schema: z.ZodObject<any, any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (err) {
      next(err);
    }
  };

export default validateBody;
