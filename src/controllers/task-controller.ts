import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";
import { ITask } from "../..";

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    // const UserId = request.body;
    const task = await Task.find({
      user: user,
    });
    return res.send(task);
  } catch (error) {
    console.log("error fecthing all tasks", error);
    return res.status(500).send("Internal server error");
  }
};

export const getAllTasksByCategoryId = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const tasks = await Task.find({
      user: user,
      categoryId: id,
    });
    res.status(200).send(tasks);
  } catch (error) {
    console.log("error fetching task by ID", error);
    return res.status(500).send({ error: "internal server error" });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const { name, isCompleted, date, categoryId }: ITask = req.body;
    const task = await Task.create({
      name,
      isCompleted,
      date,
      categoryId,
      user: user,
    });
    return res.status(201).send(task);
  } catch (error) {
    console.log("error creating task", error);
    return res.status(500).send({ error: "internal server error" });
  }
};

export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { isCompleted } = req.body;
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        isCompleted,
      }
    );

    if (!updatedTask) {
      return res.status(404).send({ error: "task not found" });
    }

    return res.status(200).send(updatedTask);
  } catch (error) {
    console.log("error toggling status", error);
    return res.status(500).send({ error: "internal server error" });
  }
};

export const getAllCompletedTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const task = await Task.find({
      user: user,
      isCompleted: true,
    });
    res.status(200).send(task);
  } catch (error) {
    console.log("error getting completed task", error);
    return res.status(500).send({ error: "internal server error" });
  }
};

export const getTasksForToday = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const todayISODate = new Date();
    todayISODate.setHours(0, 0, 0, 0);
    const task = await Task.find({
      user: user,
      date: todayISODate.toISOString(),
    });
    return res.status(200).send(task);
  } catch (error) {
    console.log("error getting task for today", error);
    return res.status(500).send({ error: "internal server error" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await Task.deleteOne({
      _id: id,
    });
    return res.status(200).send({ message: "task has been deleted" });
  } catch (error) {
    console.log("error deleting task", error);
    return res.status(500).send({ error: "internal server error" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, categoryId, date, name }: ITask = req.body;

    if (!_id || !categoryId || !date || !name) {
      return res.status(400).json({ error: "Invalid request payload" });
    }

    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      }
    );
    res.send({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task", error);
    return res.status(500).send({ error: "something went wrong" });
  }
};
