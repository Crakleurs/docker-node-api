import {config} from "~/config";
import {Sequelize} from "sequelize";


const connection = new Sequelize(config.database.DATABASE, config.database.USERNAME, config.database.PASSWORD, {
  host: config.database.HOST,
  dialect: 'postgres',
  logging: false
});

export default connection
