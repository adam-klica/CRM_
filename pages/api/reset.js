import excuteQuery from "../../lib/db";
import crypto from "crypto";

export default async (req, res) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(req.body.password, salt, 1000, 64, "sha512")
    .toString("hex");
  try {
    const user = await excuteQuery({
      query: "UPDATE users SET hash=?, salt=? WHERE id=?",
      values: [hash, salt, req.body.id],
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
