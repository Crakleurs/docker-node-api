import UserModel from "~/resources/users/user.model";
import {config} from "~/config";

const isDev = !config.PRODUCTION;

const dbInit = () => {
  UserModel.sync({ alter: isDev })
}
export default dbInit
