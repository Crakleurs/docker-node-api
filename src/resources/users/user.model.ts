import {DataTypes, Model} from "sequelize";
import {UserInput, UserInterface} from "~/resources/users/user.interface";
import connection from "~/database/config";

class UserModel extends Model<UserInterface, UserInput> implements UserInterface {
  id: number;
  username: string;
  password: string;
  role: string;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  timestamps: true,
  sequelize: connection,
  paranoid: false
})

export default UserModel;
