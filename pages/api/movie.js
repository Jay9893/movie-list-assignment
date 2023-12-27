import { Movie } from "../../models";
import upload from "../../middlewares/multer";
import multer from "multer";
import { connectToDatabase } from "../../lib/mongoose";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parsing
  },
};

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Use Multer middleware to handle the file upload
      upload.single("image")(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: "File upload error" });
        } else if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const { title, publishingYear } = req.body;

        const imageBuffer = fs.readFileSync(req.file.path);

        if (!title || !publishingYear) {
          return res
            .status(400)
            .json({ error: "title, and publishingYear are required" });
        }
        const fileExtension = req.file.mimetype;
        const connection = await connectToDatabase();
        const db = connection.connections[0].db;

        const newMovie = new Movie({
          image: {
            data: imageBuffer,
            contentType: fileExtension,
          },
          title,
          publishingYear,
        });

        await newMovie.save();

        return res.status(201).json({ success: true, result: newMovie });
      });
    } else if (req.method === "GET") {
      const connection = await connectToDatabase();
      const db = connection.connections[0].db;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8;

      const skip = (page - 1) * limit;
      const totalCount = await Movie.countDocuments();

      const result = await Movie.find()
        .select("-image")
        .skip(skip)
        .limit(limit);
      return res.status(200).json({
        success: true,
        result,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      });
    } else if (req.method === "PUT") {
      upload.single("image")(req, res, async function (err) {
        console.log(err,"dsaf");
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: "File upload error" });
        } else if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const { title, publishingYear } = req.body;

        const imageBuffer = fs.readFileSync(req.file.path);

        if (!title || !publishingYear) {
          return res
            .status(400)
            .json({ error: "title, and publishingYear are required" });
        }

        const connection = await connectToDatabase();
        const db = connection.connections[0].db;

        const { id } = req.query;

        const fileExtension = req.file.mimetype;
        const newMovie = {
          image: {
            data: imageBuffer,
            contentType: fileExtension,
          },
          title,
          publishingYear,
        };
        const updatedMovie = await Movie.findByIdAndUpdate(
          { _id: id.toString() },
          { $set: newMovie },
          {
            new: true,
          }
        );

        if (!updatedMovie) {
          return res
            .status(404)
            .json({ success: false, message: "Movie not found" });
        }

        res.status(200).json({ success: true, data: updatedMovie });
      });
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
