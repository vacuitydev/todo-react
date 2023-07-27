const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const todoController = require("../controllers/todoController")

function checkNoTitle(req,res,next){
    if(req.body.title==null){
        res.status(400).send("No title")
    }
    next();
}
function checkNoIdInQuery(req,res,next){
    if(req.query.id==null){
        console.log("No id in query")
        console.dir(req.query)
        res.status(400).send("No id in query")
        return
    }
    next();
}
function checkNoIdInBody(req,res,next){
    if(req.body.id==null){
        res.status(400).send("No id")
    }
    next();
}
function checkNoCompleted(req,res,next){
    if(req.body.id==null){
        res.status(400).send("No completed status")
    }
    next();
}
router.use(bodyParser.json())
router.get('/all', async (req, res)=>{
    const result = await todoController.GetAll()
    res.send(result);
})
router.get('/', async (req, res)=>{
    const result = await todoController.GetByID(req.query.id)
    if(result.length===0){
        res.status(404).send("No todos found for that ID")
    }
    res.send(result);
})
router.post('/', function checkTitleInBody(req, res, next){
    if(req.body.title===undefined || req.body.title===""){
        console.error("No title or empty title in post request")
        res.status(400).send(JSON.stringify({
            message: "No title in body"
        }))
        return;
    }
    next()
})
router.post('/', async(req,res)=>{
    try{
        console.dir(req.body)
        const newTodo = await todoController.CreateNew(req.body.title)
        res.send(JSON.stringify({
            message: "Created successfully",
            result: newTodo
        }))
    }catch(e){
        console.error("Error in router:", e)
        res.status(500).send("Error")
    }
})
router.patch('/completed', checkNoIdInQuery)
router.patch('/completed', function checkNoCompletedInQuery(req,res,next){
    if(req.query.completed===undefined){
        console.error("No completed in query");
        res.status(400).send("No completed in query")
        return;
    }
    next()
})
router.patch('/completed', async(req, res)=>{
    try{
        const result = 
        await todoController.UpdateCompleted(req.query.id,
            req.query.completed)
        res.send(JSON.stringify({
            message: "Changed successfully",
            result: result
        }))
    }catch(e){
        console.error("Unhandled exception in router:", e);
        res.status(500).send("Exception: ", e)
    }
})
router.delete('/', checkNoIdInQuery)
router.delete('/', async(req,res)=>{
    try{
        const result = await todoController.Delete(req.query.id)
        res.send(JSON.stringify({
            message: "Deleted successfully",
        }))
    }catch(e){
        console.error("Unhandled exception in router:", e);
        res.status(500).send("Exception: ", e)
    }
})
module.exports = router