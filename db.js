const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
})

sequelize
.authenticate()
.then(() => {
    console.log('Good job bruv. Database connected?');
})
.catch(err => {
    console.error('ERROR. Try something else buddy:', err);
});

module.exports = sequelize