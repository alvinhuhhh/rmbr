import { decodeJwt } from "jose";

export default function GetEmailFromHeaders(header: string): string | undefined {
  try {
    const jwt = header.split(" ")[1];
    const payload = decodeJwt(jwt);
    return payload.email as string;
  } catch (err) {
    console.log(err);
  }
}
