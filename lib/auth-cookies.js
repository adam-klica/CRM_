import { serialize, parse } from "cookie";

const TOKEN_NAME = "JWT_Token";

export function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });

  res.setHeader("Set-Cookie", cookie);
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}

export function parseCookies(req) {
  if (req.cookies) return req.cookies;

  const cookie = req.headers?.cookie;
  return parse(cookie || "");
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
}
