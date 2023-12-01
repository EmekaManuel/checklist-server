import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user-model";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { IUser } from "../..";

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

// create an account

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if the required fields are present
    if (!name || !email || !password) {
      return res.status(400).send("Name, email, and password are required");
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user", error);
    return res.status(500).send("Internal Server Error");
  }
};

//login user

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password Required to Login");
    }

    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return res.status(409).send({ message: "this user does not exist " });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordCorrect) {
      const token = getUserToken((await existingUser)._id);
      return res.status(200).send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return res.status(401).send({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log("error encountered when trying to login", error);
    return res.status(500).send("Internal Server Error");
  }
};
