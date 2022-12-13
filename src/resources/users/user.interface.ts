import {Optional} from "sequelize";

export interface UserInterface {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface UserInput extends Optional<UserInterface, 'id'> {}
export interface UserOutput extends Required<UserInterface> {}
