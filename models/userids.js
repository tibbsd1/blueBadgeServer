module.exports = function(sequelize,DataTypes){
    return sequelize.define('userid', {
        username:DataTypes.STRING,
        passwordhash:DataTypes.STRING
    })
}