import Post from "../models/post.model";
import { EntityRepository, getConnection, getRepository, Repository } from "typeorm";

@EntityRepository(Post)
class PostsRepository extends Repository<Post> {
  public deletePost(post: Post) {
    post.deleted_at = new Date();
    return this.save(post);
  }

  public getPostsSummaryByUserAndDC(
    user_id: string,
    dc: string
  ): Promise<number> {

    return this.createQueryBuilder("posts")
      .select("SUM(posts.amount)", "sum")
      .where("deleted_at is null")
      .andWhere("posts.userId = :user_id", { user_id })
      .andWhere("posts.dc = :dc", { dc })
      .getRawOne();
  }

  public getNLastPosts(
    user_id: string,
    dc: string,
    limit: number
  ): Promise<Post[]> {
    return this.find({
      where: { userId: user_id, dc, deleted_at: null },
      order: {
        date: "DESC",
      },
      take: limit,
    });
  }
}

export default PostsRepository;
