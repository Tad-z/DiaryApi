const Diary = require("../models/diary");

// creating database
exports.postDiary = async (req,res) => {
  product = req.body
    if (!product.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      };

      
    if(product.body.length < 40 || product.body.length > 100) {
      res.status(400).send({ message: "Content character length should be between 40 and 100 characters!" });
        return;
    }
    
    const diary = new Diary({
        body: req.body.body,
        time: req.body.time
        
    })

    try{
        const d1 = await diary.save()
        res.json(d1)
    }catch(err){
        console.log(err)
        res.send('Error')
    }
}

// updating the database

exports.patchDiary = async(req,res) => {
    if (!req.body.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    try{
        const id = req.params.id;
       
        await Diary.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
              res.send({
                message: `Cannot update diary with id=${id}. Maybe diary was not found!`
              });
            } else 
            res.send({ message: "diary was updated successfully." });
          })
       
    }catch(err){
        res.send('error')
    }
}

// fecthing all diaries
exports.getDiaries = async (req,res) => {
    try{
        const diaries = await Diary.find()
        console.log(diaries);
        return res.json(diaries);
    }catch(err){
        console.log(err);
        
    }
}

// fetching one diary
exports.getDiary = async (req,res) => {
    try{
        const diary = await Diary.findById(req.params.id);
        console.log(diary)
        if(!diary) {
            return res.send({msg: 'Diary not found'})
        }
        return res.json(diary);
    }catch(err){
        console.log(err);
    }
   
}

// Delete a diary
exports.deleteDiary = async(req,res) => {
    try{
        const id = req.params.id;
        await Diary.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Diary with id=${id}. Maybe Diary was not found!`
              });
            } else {
              res.send({
                message: "Diary was deleted successfully!"
              });
            }
          })
    }catch(err){
        res.send('error')
    }
}