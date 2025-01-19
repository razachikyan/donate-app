import { Request, Response } from "express";
import searchServices from "../services/search";

class searchController {
  constructor() {}

  async search(req: Request, res: Response) {
    try {
      const { query } = req.query;
      if (!query) {
        res.status(400).json({ message: "Empty query" });
        return;
      }
      const results = await searchServices.search(String(query));
      res.status(200).json(results);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting items:: ${err.message}` });
    }
  }
}

export default new searchController();
