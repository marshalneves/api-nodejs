import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Post from "./post.model";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  displayName: string;

  @Column()
  role: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @OneToMany(() => Post, post => post.user)
  posts: Post[]

  totalCredits: number | null;
  totalDebits: number;
  balance: number | null;
  balanceDC: string;
  lastCredits: any[] = [];
  lastDebits: any[] = [];
}
