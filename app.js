 
var express = require('express') //加载模块  
var app = express() //实例化之  
var bodyParser = require('body-parser');
var mysql = require('mysql');



var map = {"1":{id:1,name:"test"},"2":{id:2,name:"test"}} //定义一个集合资源，key为字符串完全是模仿java MAP<T,E>，否则谁会这么去写个hash啊！  
  
app.get('/devices',function(req, res){ //Restful Get方法,查找整个集合资源  
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    var conn = mysql.createConnection({
        host: '182.92.129.34',
        user: 'root',
        password: 'dmtz@2014',
        database:'db_dmwx',
        port: 3306
    });
    conn.connect();
    conn.query('SELECT * from user limit 10', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0]);
        conn.end();  
        res.send(rows);
    });
})  
app.get('/devices/:key/:value',function(req, res){ //Restful Get方法,查找一个单一资源  
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    var conn = mysql.createConnection({
        host: '182.92.129.34',
        user: 'root',
        password: 'dmtz@2014',
        database:'db_dmwx',
        port: 3306
    });
    conn.connect();
    conn.query("SELECT * from user where "+req.param('key')+"='"+req.param('value')+"'", function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0]);
        conn.end();  
        res.send(rows);
    });
})  
app.post('/devices/', bodyParser(), function(req, res){ //Restful Post方法,创建一个单一资源  
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    map[req.body.id] = req.body  
    res.send({status:"success",url:"/devices/"+req.body.id}) //id 一般由数据库产生  
})  
app.put('/devices/:id', bodyParser(), function(req, res){ //Restful Put方法,更新一个单一资源  
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    map[req.body.id] = req.body  
    res.send({status:"success",url:"/devices/"+req.param('id'),device:req.body});  
})  
app.delete('/devices/:id',function(req, res){ //Restful Delete方法,删除一个单一资源  
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    delete map[req.param('id')]  
    res.send({status:"success",url:"/devices/"+req.param('id')})  
    console.log(map)  
})  
app.listen(8812); //监听8888端口，没办法，总不好抢了tomcat的8080吧！  