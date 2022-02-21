import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import excuteQuery from "./db";

export async function createUser({ email, password }) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const user = {
    id: uuidv4(),
    email,
    hash,
    salt,
  };

  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO users (id, email, hash, salt, role) VALUES(?, ?, ?, ?, ?)",
      values: [user.id, user.email, user.hash, user.salt, "client"],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  return user;
}

export async function findUser({ email }) {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email],
    });
    return result[0];
  } catch (error) {
    console.log(error);
  }
}

export async function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
