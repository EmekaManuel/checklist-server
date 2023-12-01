import express from "express";
import { authMiddleware } from "../middleware";
import {
  createTask,
  deleteTask,
  getAllCompletedTasks,
  getAllTasks,
  getAllTasksByCategoryId,
  getTasksForToday,
  toggleTaskStatus,
  updateTask,
} from "../controllers/task-controller";

const taskRoutes = express.Router();

taskRoutes.use(authMiddleware);

taskRoutes.route("/").get(getAllTasks);
taskRoutes.route("/today").get(getTasksForToday);
taskRoutes.route("/completed").get(getAllCompletedTasks);
taskRoutes.route("/task-category/:id").get(getAllTasksByCategoryId);

taskRoutes.route("/create").post(createTask);

taskRoutes.route("/update/:id").put(toggleTaskStatus);
taskRoutes.route("/edit/:id").put(updateTask);

taskRoutes.route("/:id").delete(deleteTask);

export default taskRoutes;
