import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/connectDb";
import { v4 as uuidv4 } from "uuid";

interface UserAttributes {
  userID?: string;
  nama: string | null;
  username: string | null;
  password: string | null;
  role: string | null;
  saldo: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "userID"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public userID!: string;
  public nama!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public saldo!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    userID: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.ENUM("user", "admin"),
    saldo: DataTypes.BIGINT,
    password: DataTypes.STRING,
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default User;