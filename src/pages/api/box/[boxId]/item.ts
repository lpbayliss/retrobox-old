import to from "await-to-js";
import { addItem } from "../../../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const [err, data] = await to(
        addItem(req.query.boxId, req.body.body, req.body.submitter)
      );
      if (err) return res.status(500);
      return res.status(200).json(data);
    } else {
      return res.status(404);
    }
  } catch (error) {
    return res.status(404);
  }
}
