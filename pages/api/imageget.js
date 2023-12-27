import { Movie } from "../../models";
import { connectToDatabase } from "../../lib/mongoose";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const connection = await connectToDatabase();
      const db = connection.connections[0].db;
      const { id } = req.query;

      const result = await Movie.findById(id);

      res.setHeader("Content-Type", result.image.contentType);
      res.send(result.image.data);
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
