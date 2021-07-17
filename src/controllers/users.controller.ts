import { v4 as uuidv4 } from "uuid";
import { getCustomRepository, getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import {
  internalServerError,
  notFound,
  ok,
  unauthorized,
} from "../services/util.service";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import UsersRepository from "../repositories/usersRepository";
import User from "../models/user.model";

const insert = async (request: Request, response: Response) => {
  const user = request.body;
  console.log(user);
  const usersRepo = getRepository(User);
  // const users: User[] = await usersRepo.find({ role: "USER" });

  user.id = uuidv4();

  await usersRepo.save(user);

  return response.status(200).json(user);
};

const getUsersAccounts = async (request: Request, response: Response) => {
  const usersRepo = getRepository(User);
  const users: User[] = await usersRepo.find({ role: "USER" });

  return response.status(200).json(users);
};

const getUserById = async (request: Request, response: Response) => {
  const { user_id } = request.params;

  const usersRepo = getCustomRepository(UsersRepository);
  const user = await usersRepo.findOne(user_id);

  if (!user) {
    throw new AppError('Usuário não encontrado');

  } else {
    const postsRepo = getCustomRepository(PostsRepository);

    user.lastCredits = await postsRepo.getNLastPosts(user_id, 'C');
    user.lastDebits = await postsRepo.getNLastPosts(user_id, 'D');

    const sumCredits = await postsRepo.getPostsSummaryByUserAndDC(user_id, "C");
    const sumDebits = await postsRepo.getPostsSummaryByUserAndDC(user_id, "D");

    user.balance = sumCredits - sumDebits;
    user.balanceDC = user.balance >= 0 ? "C" : "D";

    delete user.password;

    return response.status(200).json(user);
  }
};

const auth = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const usersRepo = getRepository(User);
  const user = await usersRepo.findOne({ email });

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Usuário/Senha Inválidos",
    });
  } // return new AppError("Usuário/Senha Inválidos", 401);

  const passMatched = await compare(password, user.password);
  if (!passMatched) {
    // return new Error("Usuário/Senha Inválidos");
    return res.status(401).json({
      status: "error",
      message: "Usuário/Senha Inválidos",
    });
  }

  user.password = "***************";

  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRESIN as string;

  const token = sign(user, secret, {
    subject: user.id.toString(),
    expiresIn,
  });

  delete user.password;
  return res.status(200).json({ user, token });
};

export const usersController = {
  auth,
  insert,
  getUsersAccounts,
  getUserById,
};
