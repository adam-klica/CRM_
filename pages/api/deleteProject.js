import excuteQuery from "../../lib/db";

export default async (req, res) => {
  try {
    const result = await excuteQuery({
      query: "DELETE FROM project WHERE id = ?",
      values: [req.body.id],
    });
    console.log("ttt", result);
  } catch (error) {
    console.log(error);
  }
};
