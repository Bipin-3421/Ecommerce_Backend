import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

const validateUser =
  (schema: z.ZodObject<any, any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (err: ZodError) {
      const messsage = err.erros[0].message;
      console.log(err);
      next(err);
    }
  };

export default validateUser;
