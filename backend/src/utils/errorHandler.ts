import type { Request, Response } from "express";
import { z } from "zod";

export type ErrorResponse = {
  success: false;
  message: string;
  error?: string | z.typeToFlattenedError<any, string>;
};

export const handleError = (
  error: unknown,
  res: Response,
  context: string,
): void => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`Error ${context}:`, error);

  res.status(500).json({
    success: false,
    message: `Error ${context}`,
    error: message,
  } satisfies ErrorResponse);
};

export const handleValidationError = (
  res: Response,
  context: string,
  error: z.ZodError,
): void => {
  res.status(400).json({
    success: false,
    message: `Invalid ${context}`,
    error: error.flatten(),
  } satisfies ErrorResponse);
};
