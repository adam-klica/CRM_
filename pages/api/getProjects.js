import excuteQuery from "../../lib/db";

const handler = async (req, res) => {
  try {
    const results = await excuteQuery({
      query: "SELECT * FROM project",
    });
    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
