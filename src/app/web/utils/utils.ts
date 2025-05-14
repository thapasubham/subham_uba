import { Request } from "express";

export function parseBody(req: Request) {
  if (req.body == null) {
    console.log("failed to parse user");
  }
  const payload = req.body;
  return payload;
}
