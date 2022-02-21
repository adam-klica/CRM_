import excuteQuery from "../../lib/db";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO project (id, email, title, descr, date, status) VALUES(?, ?, ?, ?, ?, ?)",
      values: [
        uuidv4(),
        req.body.email,
        req.body.title,
        req.body.desc,
        req.body.date,
        req.body.status,
      ],
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
