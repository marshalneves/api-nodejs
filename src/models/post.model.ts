import { v4 as uuidv4 } from "uuid";
import AppError from "../errors/AppError";
import { format } from "date-fns";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./user.model";

@Entity("posts")
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  userId: string

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  date: number;

  @Column()
  dc: string;

  @Column()
  created_at: Date;

  @Column()
  deleted_at: Date;

}

export default Post;
