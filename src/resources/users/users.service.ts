import UserModel from "~/resources/users/user.model";
import {UserOutput} from "~/resources/users/user.interface";
import {NotFoundException} from "~/utils/exception";

export class UsersService {
  async findAll(): Promise<UserModel[]> {
    return await UserModel.findAll();
  }

  async findOne(id: number): Promise<UserModel> {
    const user = await UserModel.findByPk(id);
    if (!user)
      throw new NotFoundException("user with id " + id + " not found.")

    return user;
  }

}
