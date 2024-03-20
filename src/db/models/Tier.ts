import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/connectDb";
import { v4 as uuidv4 } from "uuid";

interface TierAttributes {
  tierID?: string;
  harga: number;
  nama: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TierInput extends Optional<TierAttributes, "tierID"> {}
export interface TierOutput extends Required<TierAttributes> {}

class Tier extends Model<TierAttributes, TierInput> implements TierAttributes {
  public tierID!: string;
  public harga!: number;
  public nama!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tier.init(
  {
    tierID: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    harga: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default Tier;
