const Sequelize = require('sequelize');

const db = new Sequelize('mytestdb','myuser','mypass',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5
    }
});

const Users = db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Bands = db.define('bands',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isDelete:{
        type: Sequelize.INTEGER,
        defaultValue: '1'
    }
});

Users.hasMany(Bands);
Bands.belongsTo(Users);

db.sync()
    .then(() => {
        console.log("Database is created successfully");
    })
    .catch((err) => console.log("Error in creating database"))

exports = module.exports = {
    db,Users,Bands
}