import express, { Request, Response } from "express";
import connectDatabase from "./db";
import userRoute from "./routes/user-routes";
import categoryRoutes from "./routes/category-routes";
import taskRoutes from "./routes/task-routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 1337;

connectDatabase();

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use("/user", userRoute);
app.use("/category", categoryRoutes);
app.use("/task", taskRoutes);

app.listen(PORT, () => {
  console.log("server is active");
});
