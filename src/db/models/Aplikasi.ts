import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/connectDb";
import { v4 as uuidv4 } from "uuid";

interface AplikasiAttributes {
  aplikasiID?: string;
  nama: string;
  tierID: string;
  image: string;
  deskripsi: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AplikasiInput
  extends Optional<AplikasiAttributes, "aplikasiID"> {}
export interface AplikasiOutput extends Required<AplikasiAttributes> {}

class Aplikasi
  extends Model<AplikasiAttributes, AplikasiInput>
  implements AplikasiAttributes
{
  public aplikasiID!: string;
  public nama!: string;
  public tierID!: string;
  public image!: string;
  public deskripsi!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Aplikasi.init(
  {
    aplikasiID: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    nama: DataTypes.STRING,
    tierID: DataTypes.STRING,
    image: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default Aplikasi;
