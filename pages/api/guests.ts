// pages/api/add.js
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/pages/models/guest";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const guests = await Guest.find({});
        res.status(200).json({ success: true, data: guests });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const guest = await Guest.create(req.body);
        res.status(201).json({ success: true, data: guest });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
