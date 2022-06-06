import to from "await-to-js";
import { fetchBox, fetchDump } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const [err, data] = await to(fetchDump(req.query.dumpId));
      if (err) return res.status(500);
      return res.status(200).json(data);
    } else {
      return res.status(404);
    }
  } catch (error) {
    return res.status(404);
  }
}
