import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

const router = express.Router();

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


async function getCollection(){
    let collectionName = process.env.MONGO_INITDB_DATABASE
    let collection = db.collection(collectionName);
    return collection
}

async function getUserIdFromUserName(){
    let collection = await getCollection()
}
// router to get all the habits for the day. 
router.get("/:username/", async (req, res) => {
    try{
        const { username } = req.params; // Get the username from the route parameter
        const d = new Date();
        let currentMonth = d.getMonth();
        let currentYear = new Date().getFullYear()
        console.log('the month is '+ month)
        let collection = await getCollection()
        let results = await collection.find({username:username, month: currentMonth, year:currentYear }).toArray();
        res.send(results).status(200);

    }catch(err){
        console.error('The error is' + err)
    }
   
  });

router.post('/create-habit/', async(req,res)=>{
    try {
        let newDocument = {
          username: req.body.username,
          name: req.body.habitName,
          description: req.body.habitDescription,
        };
        let collection = await getCollection()
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
      }

})

export default router;

