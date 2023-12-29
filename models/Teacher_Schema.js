import { DataTypes } from "sequelize";
import sequelize from "@/config/dbconnection";

const Teacher = sequelize.define(
  "demoteacher",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    UserName:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    Password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    Role: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "demoteacher",
    timestamps: false,
  }
);
export default Teacher;
