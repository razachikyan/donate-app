import { Request, Response } from "express";
import itemsServices from "../services/items";

class ItemsController {
  constructor() {}

  async getItems(_: Request, res: Response) {
    try {
      const items = await itemsServices.getItems();
      res.status(200).json(items);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting items:: ${err.message}` });
    }
  }
  async getItemsByUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty user ID" });
        return;
      }
      const items = await itemsServices.getItemsByUser(id);
      res.status(200).json(items);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting items:: ${err.message}` });
    }
  }
  async getItemsByCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty category ID" });
        return;
      }
      const items = await itemsServices.getItemsByCategory(id);
      res.status(200).json(items);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting items:: ${err.message}` });
    }
  }
  async getItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty item ID" });
        return;
      }
      const item = await itemsServices.getItemById(id);
      if (!item) {
        res.status(400).json(`No items with id:${id}`);
        return;
      }
      res.status(200).json(item);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting item:: ${err.message}` });
    }
  }

  async updateItemStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty item ID" });
        return;
      }
      await itemsServices.updateItemStatus(id, req.body.status);
      res
        .status(200)
        .json({ message: "Item status updated successfully" });
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting item:: ${err.message}` });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty item ID" });
        return;
      }
      await itemsServices.removeItem(id);
      res.status(200).json({ message: "Item removed successfully" });
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting item:: ${err.message}` });
    }
  }

  async createItem(req: Request, res: Response) {
    try {
      const item = req.body;
      const { type = "user" } = req.query;
      const created = await itemsServices.createItem(item, String(type));
      res.status(201).json(created);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ err });
    }
  }
}

export default new ItemsController();
