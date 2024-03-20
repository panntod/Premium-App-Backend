import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize("premium_app", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelizeConnection;
