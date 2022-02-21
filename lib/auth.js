import { setTokenCookie, getTokenCookie } from "./auth-cookies";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export async function setLoginSession(res, session) {
  const obj = { ...session };
  const token = jwt.sign({ id: obj.id, email: obj.email }, TOKEN_SECRET, {
    expiresIn: "4h",
  });
  setTokenCookie(res, token);
}
export async function getLoginSession(req) {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = jwt.verify(token, TOKEN_SECRET);

  return session;
}
