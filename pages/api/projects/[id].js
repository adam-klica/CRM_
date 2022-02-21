import excuteQuery from "../../../lib/db";

const handler = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const results = await excuteQuery({
      query: `SELECT * FROM project WHERE email = "${id}"`,
    });
    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
