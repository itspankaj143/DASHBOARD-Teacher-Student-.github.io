const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {host: process.env.DB_HOST,
        logging:false,
    dialect: "mysql",
    dialectModule: require('mysql2'),
    }
    );

    async function connection(){
        try{
            await sequelize.authenticate();
            console.log("Connection has been established successfully");
        }catch(e){
            console.log("Unable to connect", e)
        }
    }

    connection();

    module.exports = sequelize