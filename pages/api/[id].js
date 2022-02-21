import excuteQuery from "../../lib/db";

const getProjectByID = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const result = await excuteQuery({
      query: `SELECT * FROM project WHERE id = "${id}" `,
    });
    return res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default getProjectByID;
