import { Between, getCustomRepository, LessThan, MoreThan } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import {
  internalServerError,
  notFound,
  ok,
  unauthorized,
} from "../services/util.service";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import UsersRepository from "../repositories/usersRepository";
import PostsRepository from "../repositories/postsRepository";
import Post from "../models/post.model";

const insert = async (request: Request, response: Response) => {
  const { user_id, amount, dc, description, date } = request.body;

  const usersRepo = getCustomRepository(UsersRepository);
  const user = await usersRepo.findOne({ id: user_id });

  if (!user) {
    throw new AppError("Usuário não encontrado");
  }

  const newPost = new Post();
  newPost.id = uuidv4();
  newPost.user = user;
  newPost.amount = amount;
  newPost.description = description;
  newPost.dc = dc;
  newPost.date = date;
  newPost.created_at = new Date();

  const postsRepo = getCustomRepository(PostsRepository);
  const postResult = await postsRepo.save(newPost);

  return response.status(200).json(postResult);
};

const update = async (request: Request, response: Response) => {
  const { post_id, amount, dc, description, date } = request.body;

  console.log(post_id);
  const postsRepo = getCustomRepository(PostsRepository);
  const post = await postsRepo.findOne({ id: post_id });

  if (!post) {
    throw new AppError("Post não encontrado");
  }

  post.amount = amount;
  post.description = description;
  post.dc = dc;
  post.date = date;

  const postResult = await postsRepo.save(post);

  return response.status(200).json(postResult);
};

const remove = async (request: Request, response: Response) => {
  const { id } = request.body;

  console.log(id);
  const postsRepo = getCustomRepository(PostsRepository);
  const post = await postsRepo.findOne({ where: {id} });

  if (!post) {
    throw new AppError("Post não encontrado!");
  }

  await postsRepo.deletePost(post);

  return response.status(200).json({ message: 'Post deleted!'});
};

const getById = async (request: Request, response: Response) => {
  const id = request.params.post_id;

  const postsRepo = getCustomRepository(PostsRepository);
  const post = await postsRepo.findOne(id);

  return response.status(200).json(post);
};

const list = async (request: Request, response: Response) => {
  let { userId, startDate, endDate, dc, limit } = request.body;

  const postsRepo = getCustomRepository(PostsRepository);

  if (!startDate) {
    startDate = "2000-01-01";
    endDate = "2099-01-01";
  }

  const filter: any = {
    userId: userId,
    date: Between(startDate, endDate),
  };

  if (dc) filter.dc = dc;

  const posts: Post[] = await postsRepo.find({
    where: filter,
    take: limit,
  });

  return response.status(200).json(posts);
};

const recentPosts = async (request: Request, response: Response) => {
  const { user_id, limit } = request.params;
  const postsRepo = getCustomRepository(PostsRepository);

  const credits: Post[] = await postsRepo.getNLastPosts(user_id, "C", Number(limit));
  const debits: Post[] = await postsRepo.getNLastPosts(user_id, "D", Number(limit));

  return response.status(200).json({ credits, debits });
};

const getBalance = async (request: Request, response: Response) => {
  const user_id = request.params.user_id;
  const postsRepo = getCustomRepository(PostsRepository);

  const summaryCredits: any = await postsRepo.getPostsSummaryByUserAndDC(user_id, "C");
  const summaryDebits: any = await postsRepo.getPostsSummaryByUserAndDC(user_id, "D");
  const balance = summaryCredits.sum - summaryDebits.sum;
  const balanceDC = summaryCredits.sum >= summaryDebits.sum ? "C" : "D";

  return response
    .status(200)
    .json({ summaryCredits, summaryDebits, balance, balanceDC });
};

export const postsController = {
  insert,
  update,
  list,
  remove,
  getById,
  recentPosts,
  getBalance,
};
