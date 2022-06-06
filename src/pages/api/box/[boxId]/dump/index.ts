import to from "await-to-js";
import { createDump } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const [err, data] = await to(createDump(req.query.boxId));
      if (err) return res.status(500);
      return res.status(201).json(data);
    } else {
      return res.status(404);
    }
  } catch (error) {
    return res.status(404);
  }
}
