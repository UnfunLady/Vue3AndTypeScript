var mysql=require('mysql')
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'luyuxi',
    database:'vuets',
    port:3307
})
module.exports = connection;