import UserModel from "~/resources/users/user.model";
import {BadRequestException, NotFoundException} from "~/utils/exception";
import bcrypt from "bcrypt";
import {config} from "~/config";
import * as console from "console";

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

  async create(username: string, password: string, role: "ADMIN" | "USER" | "READER") {

    const existingUser = await UserModel.findOne({where: {username: username}})
    console.log(existingUser)
    if (existingUser)
      throw new BadRequestException("USER ALREADY EXIST")
    const hash = await bcrypt.hash(password, config.saltRounds);

    return await UserModel.create({username: username, password: hash, role: role});
  }
}
