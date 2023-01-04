import UserModel from "~/resources/users/user.model";
import {BadRequestException, NotFoundException} from "~/utils/exception";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from "~/config";

export class AuthService {
  async auth(username: string, password: string) {
    const user = await UserModel.findOne({where: {username: username}});

    if (!user)
      throw new NotFoundException("USER NOT FOUND");

    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    if (!passwordIsCorrect)
      throw new BadRequestException("PASSWORD INCORRECT")


    return jwt.sign( {id: user.id, username: user.username, role: user.role}, config.jwtSecret)
  }
}
