import User from "../models/user.model";
import { EntityRepository, getRepository, Repository } from "typeorm";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findUserByRole(role?: string): Promise<User[]> {
    return this.find({
      where: { role },
    });
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }
}

export default UsersRepository;

// const createUser = async (user: User) => {
//     // const id = uuidv4()
//     //TODO: encript password
//     const hashedPassword =  await hash(user.password, 8);
//     // await dbQuery(`INSERT INTO tb_users (name, role, email, password) VALUES(?, ?, ?, ?)`, [user.name, user.role, user.email, hashedPassword])
//     // let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'tb_users'`);
//     return getUser(retorno[0].id);
// }
