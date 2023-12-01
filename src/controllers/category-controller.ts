import { ICategory } from "../..";
import { AuthRequest } from "../middleware";
import Category from "../models/category-model";
import { Request, Response } from "express";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;

    const categories = await Category.find({
      user: user,
    });

    return res.send(categories);
  } catch (error) {
    console.error("Error fetching categories", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const categoryById = await Category.findById(id);

    if (!categoryById) {
      return res.status(404).send("Category not found");
    }

    return res.send(categoryById);
  } catch (error) {
    console.log("Error fetching category by Id", error);
    res.status(500).send("Internal server error");
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { color, icon, isEditable, name }: ICategory = req.body;
    const { user } = req;

    if (!color || !icon || !name) {
      return res.status(400).json({ error: "Invalid request payload" });
    }

    const category = await Category.create({
      color,
      icon,
      isEditable,
      name,
      user,
    });
    res.send(category);
  } catch (error) {
    console.error("Error creating categories", error);
    return res.status(500).send({ error: "something went wrong" });
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = req.body;

    if (!_id || !color || !icon || !isEditable || !name) {
      return res.status(400).json({ error: "Invalid request payload" });
    }

    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );
    res.send({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error deleting categories", error);
    return res.status(500).send({ error: "something went wrong" });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Category.deleteOne({ _id: id });
    return res.send({ message: "Category Deleted" });
  } catch (error) {
    console.error("Error deleting categories", error);
    return res.status(500).send({ error: "something went wrong" });
  }
};
