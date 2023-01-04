import {config} from "~/config";
import {Sequelize, Dialect} from "sequelize";


const connection = new Sequelize(config.database.DATABASE, config.database.USERNAME, config.database.PASSWORD, {
  host: config.database.HOST,
  dialect: 'postgres'
});


const tryConnection = async () => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connection
