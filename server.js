var express = require("express");
var cors = require("cors");

app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
var mongoClient = require("mongodb").MongoClient;
var conSring = ("mongodb://localhost:27017");
mongoClient.connect(conSring,(err,clientObject)=>{
    if(!err){
        console.log("connected Succesfully...");
    }
});
app.get("/",(req,res)=>{
    res.send(`
    <h1>welcome to fake students API</h1>
    <ol>
    <li><a href="http://127.0.0.1:8087/students">/students</a></li>
    </ol>`);
});
app.get("/students",(req,res)=>{
    mongoClient.connect(conSring,(err,clientObject)=>{
        if(!err){
            var database = clientObject.db("aref");
            database.collection("students").find({}).toArray((err,documents)=>{
                if(!err){
                res.send(documents);
                res.end();
                }
            })
        }
    });
    
});
app.get("/students/:age",(req,res)=>{
    var age = parseInt(req.params.age);
    mongoClient.connect(conSring,(err,clientObject)=>{
        if(!err){
            var database = clientObject.db("aref");
            database.collection("students").find({age:age}).toArray((err,documents)=>{
                if(!err){
                res.send(documents);
                res.end();
                }
            })
        }
    });
    
});
app.get("/details/:id",(req,res)=>{
    var id = req.params.id;
    mongoClient.connect(conSring,(err,clientObject)=>{
        if(!err){
            var database = clientObject.db("aref");
            database.collection("students").find({id:id}).toArray((err,documents)=>{
                if(!err){
                res.send(documents);
                res.end();
                }
            })
        }
    });
    
});
app.get("/demo/:id/:name/:city", (req,res)=>{
    res.send(req.params.id + "<br>" + req.params.name + "<br>" + req.params.city);
});
app.post("/register",(req,res)=>{
    mongoClient.connect(conSring,(err,clientObject)=>{
        if(!err){
            var dataBase = clientObject.db("aref");
            var student = {
                name : req.body.Name,
                age : parseInt(req.body.Age),
                city: req.body.City,
                id: req.body.id
            }
            dataBase.collection("students").insertOne(student,(err,result)=>{
                if(!err){
                    console.log("record inserted");
                    res.redirect("/students");
                }else{
                    console.log(err);
                }
            })
        }
    })
});
app.post("/registerStudent",(req,res)=>{
    mongoClient.connect(conSring,(err,clientObject)=>{
        if(!err){
            var dataBase = clientObject.db("aref");
            var student = {
                name : req.body.Name,
                age : parseInt(req.body.Age),
                city: req.body.City,
                id: req.body.id
            }
            dataBase.collection("students").insertOne(student,(err,result)=>{
                if(!err){
                    console.log("record inserted");
                    res.redirect("/students");
                }else{
                    console.log(err);
                }
            })
        }
    })
});
app.delete("/deleteStudent/:id", (req,res)=>{
    var id = req.params.id;
    mongoClient.connect(conSring,(err, clientObject)=>{
        if(!err){
            var dataBase = clientObject.db("aref");
            dataBase.collection("students").deleteOne({id:id},(err,result)=>{
                if(!err){
                    console.log("record deleted");
                    res.redirect("/students");
                }
            })
        }
    })
});
app.put("/updateStudent/:id", (req,res)=>{
    mongoClient.connect(conSring,(err,clientObject)=>{
        if(!err){
            var findQuery = {
                id : req.params.id
            }
            var dataBase = clientObject.db("aref");
            dataBase.collection("students").updateOne(findQuery,{$set:{name:req.body.name, age:req.body.age,city:req.body.city,id: req.body.id}},(err,result)=>{
                if(!err){
                    console.log("record updated..");
                    res.redirect("/students");
                }else{
                    console.log(err);
                }
            })
        }
    })
})
app.get("**",(req,res)=>{
    res.send("Not Found - The path you requested is not Available!");
});
app.listen(8087);
console.log("server strated at http://127.0.0.1:8087");
