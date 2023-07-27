const todoModel = require('../models/todoModel')
module.exports.GetAll= async()=>{
    try{
        const result =await todoModel.find()
        return result
    }catch(e){
        console.error("Error in controller:", e)
    }
}
module.exports.GetByID=async(id)=>{
    try{
        const result =await todoModel.find({
            "_id":id
        })
        if(result.length===0){
            console.log(`No todos found for ${id}`)
        }
        return result
    }catch(e){
        console.error("Error in controller:", e)
    }
}
module.exports.CreateNew = async(title)=>{
    try{
        const newTodo = new todoModel({
            title: title
        })
        await newTodo.save();
        return newTodo;
    }catch(e){
        console.error("Error in controller:", e)
    }
}
module.exports.Update = async(id,title, completed)=>{
    try{
        let found = 
        await todoModel.findById(id)
        if(found==null){
            throw("Document not found")
        }
        found.title = title;
        found.completed =completed;
        await found.save();
        return found;
    }catch(e){
        console.error("Unknown exception in controller: ", e)
        throw(e)
    }
}
module.exports.UpdateCompleted = async(id, completed)=>{
    try{
        console.log(`Setting ${id} to ${completed}`)
        let found = 
        await todoModel.findById(id)
        if(found==null){
            throw("Document not found")
        }
        found.completed =completed;
        await found.save();
        return found;
    }catch(e){
        console.error("Unknown exception in controller while updating completed : ", e)
        throw(e)
    }
}
module.exports.Delete = async(id)=>{
    try{
        await todoModel.deleteOne({"_id":id})
    }catch(e){
        console.error("Unknown exception in controller: ", e)
        throw(e)
    }
}