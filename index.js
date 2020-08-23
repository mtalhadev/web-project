const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require("body-parser");
const app = express()
const path= require('path')
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './ui/build')));
app.set('view engine', 'ejs');
function SELECT_PARTNER(userid,interest){
    return `SELECT * FROM userqueue WHERE userid!='${userid}' AND interest='${interest}' ORDER BY RAND() LIMIT 1;`
}

function INSERT_USER_IN_QUEUE(userid,interest){
    if(interest){
return `INSERT INTO userqueue(userid,interest) VALUES('${userid}','${interest}')`
}
else{
    return `INSERT INTO userqueue(userid,interest) VALUES('${userid}','none')` 
}
}

function CREATE_ROOM(userid1,userid2){
    return `CREATE TABLE room${userid1}${userid2} (senderId VARCHAR(45),receiverid VARCHAR(45),message VARCHAR(1000))`
}

function DELETE_ROOM(roomNo){
    return `DROP TABLE ${roomNo}`
}

function INSERT_MESSAGE(senderId,receiverId,message,roomNo){
    return `INSERT INTO ${roomNo}(senderId,receiverId,message) VALUES('${senderId}','${receiverId}','${message}')`
}

function GET_MESSAGES(roomNo){
    return `SELECT * FROM ${roomNo}`
}

function DELETE_USER_FROM_QUEUE(userid){
return `DELETE FROM userqueue WHERE userid='${userid}'`
}

// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'rootpass',
//     database:'db',
//     insecureAuth : true
// })

var db_config = {
    host:'qn0cquuabmqczee2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'y64jh32kx79aqv9x',
    password:'s7furoesf5sz151c',
    database:'o1mi2nd3ruws0d82'
}
function handleDisconnect() {
	console.log('handleDisconnect()');
	connection.destroy();
	connection = mysql.createConnection(db_config);
	connection.connect(function(err) {
	    if(err) {
			console.log(' Error when connecting to db  (DBERR001):', err);
			setTimeout(handleDisconnect, 5000);
	    }
	});

}
var connection = mysql.createConnection(db_config);
// const connection=mysql.createConnection("ALTER db 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpass'")
// connection.connect(err=>{
//     if(err){
//     return(err)
// }else{
//     console.log("connected to database")
// }
// })

connection.connect(function(err) {                 // The server is either down
    if(err) {                                   // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err.code);
        setTimeout(handleDisconnect, 1000);
		handleDisconnect();
           
    }else{
        console.log('Connected to db!');
    }                                           // to avoid a hot loop, and to allow our node script to
});    

console.log("connectss")

app.use(cors())

// app.get('/',(req,res)=>{
//     res.status(200).json({
//         message: "runs",
//         success:true
//     });
// });

app.post('/insertinqueue',(req,res)=>{
    const {userid,interest} = req.body
   connection.query(INSERT_USER_IN_QUEUE(userid,interest),(err,results)=>{
       if(err){
           console.log(err,"error")
       return res.send(err)
    }
       else{
           console.log("success")
       return res.send("success")
    }
   })
})

app.post('/deletefromqueue',(req,res)=>{

    const {userid} = req.body
   connection.query(DELETE_USER_FROM_QUEUE(userid),(err,results)=>{
       if(err){
           console.log(err,"delete nhe hogia")
       return res.send(err)
    }
       else{
           console.log("queue deleted")
       return res.status(200).json({ success: true, results });
    }
   })
})



app.post('/searchforpartner',(req,res)=>{
    const {userid,interest} = req.body
    connection.query(SELECT_PARTNER(userid,interest),(err,results)=>{
        if(err){
            console.log(err,"searc")
            return res.send(err)
        }
        else{
            if(results.length==0){
            return res.status(400).json({ success: true, results });}
            else{
            console.log(results,"searc")
        return res.status(200).json({ success: true, results });}
     }
    })
})

app.post('/createroom',(req,res)=>{
    const {userid1,userid2} = req.body
    console.log(userid1)
    connection.query(CREATE_ROOM(userid1,userid2),(err,results)=>{
        if(err){
            console.log(err,"error")
        return res.send(err)
     }
        else{
        console.log(results,"room");
        return res.status(200).json({ success: true, results,roomNo:"room"+userid1+userid2 });
     }
    })

})

app.post('/deleteroom',(req,res)=>{
    const {roomNo} = req.body
    connection.query(DELETE_ROOM(roomNo),(err,results)=>{
        if(err){
            console.log(err,"delete nhe hua")
        return res.send(err)
     }
        else{
console.log("deletehogia")
        return res.status(200).json({ success: true, results });
     }
    }) 
})

app.post('/insertmessage',(req,res)=>{
    const {senderId,receiverId,message,roomNo} = req.body

    connection.query(INSERT_MESSAGE(senderId,receiverId,message,roomNo),(err,results)=>{
        if(err){
            console.log(err,"messageeroor")
            return res.send(err)
        }
        else{
            console.log(results,"message")
        return res.status(200).json({ success: true, results });
     }
    })
})

app.post('/getmessages',(req,res)=>{
    const {roomNo} = req.body
    connection.query(GET_MESSAGES(roomNo),(err,results)=>{
        if(err){
            console.log(err,"getmessage")
        return res.send(err)
     }
        else{
            console.log(results,"getmessageperfect")
        return res.status(200).json({ success: true, results });
     }
    })
})


app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './ui/build/index.html'));
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));