import { Request, Response } from "express";
import usersServices from "../services/users";

class UsersController {
  constructor() {}

  async getUsers(_: Request, res: Response) {
    try {
      const users = await usersServices.getUsers();
      res.status(200).json(users);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting users:: ${err.message}` });
    }
  }
  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Empty user ID" });
        return;
      }
      const user = await usersServices.getUserById(id);
      if (!user) {
        res.status(400).json(`No user with id:${id}`);
        return;
      }
      res.status(200).json(user);
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: `Error while getting user:: ${err.message}` });
    }
  }
}

export default new UsersController();
