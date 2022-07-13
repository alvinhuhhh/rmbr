import { decodeJwt } from "jose";

export default function GetEmailFromHeaders(header: string): string {
  const jwt = header.split(" ")[1];
  const payload = decodeJwt(jwt);
  return payload.email as string;
}
