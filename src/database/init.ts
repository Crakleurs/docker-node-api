import UserModel from "~/resources/users/user.model";
import {config} from "~/config";
import * as process from "process";
import {UsersService} from "~/resources/users/users.service";

const isDev = !config.PRODUCTION;

const dbInit = async () => {
  await UserModel.sync({alter: isDev})

  let username = "admin";
  if (process.env.ADMIN_NAME)
    username = process.env.ADMIN_NAME;

  if (await UserModel.findOne({where: {username: username}}))
    return;

  const userService = new UsersService();
  let password = "password";
  if (process.env.ADMIN_PASSWORD)
    password = process.env.ADMIN_PASSWORD;

  await userService.create(username, password, "ADMIN")


}
export default dbInit
