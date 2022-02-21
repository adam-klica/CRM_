import excuteQuery from "../../lib/db";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export default async (req, res) => {
  const lema = "proslo";
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(req.body.password, salt, 1000, 64, "sha512")
    .toString("hex");
  try {
    const test = await excuteQuery({
      query: `SELECT * FROM users WHERE email="${req.body.email}"`,
    });

    if (test.length < 1) {
      const result = await excuteQuery({
        query:
          "INSERT INTO users (id, name, email, hash, salt, role) VALUES(?,?, ?, ?, ?, ?)",
        values: [uuidv4(), req.body.name, req.body.email, hash, salt, "client"],
      });
      return res.status(200).json(result);
    }
    return res.status(200).json(test);
  } catch (error) {
    console.log(error);
  }
};
