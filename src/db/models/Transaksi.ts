import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/connectDb";
import { v4 as uuidv4 } from "uuid";

interface TransaksiAttributes {
  transaksiID?: string;
  tgl: Date;
  userID: string;
  aplikasiID: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransaksiInput
  extends Optional<TransaksiAttributes, "transaksiID"> {}
export interface TransaksiOutput extends Required<TransaksiAttributes> {}

class Transaksi
  extends Model<TransaksiAttributes, TransaksiInput>
  implements TransaksiAttributes
{
  public transaksiID!: string;
  public tgl!: Date;
  public userID!: string;
  public aplikasiID!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaksi.init(
  {
    transaksiID: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    tgl: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    aplikasiID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default Transaksi;
