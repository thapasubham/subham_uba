import { Request } from "express";

export function parseBody(req: Request) {
  if (!req.body) {
    return {};
  }
  const payload = req.body;
  return payload;
}
