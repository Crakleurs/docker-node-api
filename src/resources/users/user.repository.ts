import {UserInput, UserOutput} from "~/resources/users/user.interface";
import UserModel from "~/resources/users/user.model";
import {NotFoundException} from "~/utils/exception";

class UserRepository {
  async create (payload: UserInput): Promise<UserOutput> {
    return await UserModel.create(payload)
  }

  async findAll(): Promise<UserOutput[]> {
    return await UserModel.findAll();
  }

  async findOneById(id: number): Promise<UserModel | null> {
    const user = UserModel.findByPk(id);

    if (!user)
      throw new NotFoundException("User with id " + id + " not found")
    return await UserModel.findOne({where: {id: id}});
  }
}
