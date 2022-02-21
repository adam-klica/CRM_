import excuteQuery from "../../lib/db";

export default async (req, res) => {
  try {
    const result = await excuteQuery({
      query: "UPDATE project SET title=?, descr=?, date=?, status=? WHERE id=?",
      values: [
        req.body.title,
        req.body.desc,
        req.body.date,
        req.body.status,
        req.body.id,
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
