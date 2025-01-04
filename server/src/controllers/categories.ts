import { Request, Response } from "express";
import categoriesService from "../services/categories";

class CategoriesController {
  async getCategories(_: Request, res: Response) {
    try {
      const categories = await categoriesService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Error fetching categories" });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      if (!name) {
          res.status(400).json({ message: "Category name is required" });
          return;
      }

      const newCategory = await categoriesService.createCategory({
        name,
        description,
      });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Error creating category" });
    }
  }
}

export default new CategoriesController();
