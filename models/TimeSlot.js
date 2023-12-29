import { DataTypes } from "sequelize";
import sequelize from "@/config/dbconnection";
import moment from "moment-timezone";
const TimeSlot = sequelize.define("timeslots", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: moment().tz("Asia/Kolkata").format(),
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default TimeSlot;
