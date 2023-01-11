import UserModel from "~/resources/users/user.model";
import {BadRequestException, NotFoundException} from "~/utils/exception";
import bcrypt from "bcrypt";
import {config} from "~/config";

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

    if (existingUser)
      throw new BadRequestException("USER ALREADY EXIST")

    const hash = await bcrypt.hash(password, config.saltRounds);

    return await UserModel.create({username: username, password: hash, role: role});
  }


  async countAdmins() {
    const users = await UserModel.findAll({where: {role: "ADMIN"}});
    return {count: users.length};
  }

  async countUsers() {
    const users = await UserModel.findAll({where: {role: "USER"}});
    return {count: users.length};
  }

  async countReaders() {
    const users = await UserModel.findAll({where: {role: "READER"}});
    return {count: users.length};
  }

  async count() {
    const users = await UserModel.findAll();
    return {count: users.length};
  }


  async changePassword(id: number, password: string) {
    const user = await UserModel.findOne({where: {id: id}})

    if (!user)
      throw new NotFoundException("USER NOT FOUND");

    const hash = await bcrypt.hash(password, config.saltRounds);
    user.password = hash;

    return await UserModel.update(user, {where: {id: id}});
  }

  async delete(id: number) {

    return { count: await UserModel.destroy({where: {id: id}})};
  }
}
