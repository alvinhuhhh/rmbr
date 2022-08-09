import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

export default async function verify(req: Request, res: Response, next: NextFunction): Promise<void> {
  const client = new OAuth2Client(process.env.CLIENT_ID);

  try {
    const token = req.get("Authorization")?.split(" ")[1] as string;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    if (ticket) {
      req.email = ticket.getPayload()?.email;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send();
  }
}
