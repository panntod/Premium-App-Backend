import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/connectDb";
import { v4 as uuidv4 } from "uuid";

interface DetailTransaksiAttributes {
  detailTransaksiID?: string;
  transaksiID: string;
  aplikasiID: string;
  tierID: string;
  harga: number;
  durasi: number;
  totalHarga: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DetailTransaksiInput
  extends Optional<DetailTransaksiAttributes, "detailTransaksiID"> {}
export interface DetailTransaksiOutput
  extends Required<DetailTransaksiAttributes> {}

class DetailTransaksi
  extends Model<DetailTransaksiAttributes, DetailTransaksiInput>
  implements DetailTransaksiAttributes
{
  public detailTransaksiID!: string;
  public transaksiID!: string;
  public aplikasiID!: string;
  public tierID!: string;
  public harga!: number;
  public durasi!: number;
  public totalHarga!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DetailTransaksi.init(
  {
    detailTransaksiID: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    transaksiID: DataTypes.STRING,
    aplikasiID: DataTypes.STRING,
    tierID: DataTypes.STRING,
    harga: DataTypes.BIGINT,
    durasi: DataTypes.BIGINT,
    totalHarga: DataTypes.BIGINT,
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default DetailTransaksi;
