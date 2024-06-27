import { Response } from "express";

export interface TotalProductResponse
  extends Response<{ success: boolean; totalProduct: number }> {}
