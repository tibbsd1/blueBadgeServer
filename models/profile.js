module.exports = function(sequelize, DataTypes) {
  return sequelize.define("profile", {
    username: DataTypes.STRING,
    tracktitle: DataTypes.STRING,
    releaseyear: DataTypes.INTEGER,
    trackurl: DataTypes.STRING,
    owner: DataTypes.INTEGER
  });
};

// let nums = [12,6,10,5]
// let newNum = (nums.map( num => {
//     return num*2;
// }))
// console.log(newNum);
// console.log(nums)


// let myArray = [
//     { name: "Jerome", age: 20, hobby: "Coding" },
//     { name: "Sam", age: 12, hobby: "Watching Batman" },
//     { name: "Alex", age: 65, hobby: "BBQ" },
//     { name: "Rob", age: 30, hobby: "Pinterest" },
//     { name: "Bob", age: 26, hobby: "Presidential Trivia" }
// ];

// myArray.map(person => {
//     console.log(`${person.name} is ${person.age} and likes ${person.hobby}`)
//     })





