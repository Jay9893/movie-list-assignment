// pages/api/create-post.js

import  User from "../../models/User";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../lib/mongoose";

export default async function handler(req, res) {
  try {
    // Ensure the request is a POST request
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
    }
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "email and password are required" });
    }
    const connection = await connectToDatabase();
    const db = connection.connections[0].db;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and verify the password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Authentication successful
      return res.status(200).json({
        success: true,
        data: "Authentication successful",
        result: user,
      });
    } else {
      // Authentication failed
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
