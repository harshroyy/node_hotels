const express = require('express');
const router = express.Router();
const Person = require("./../models/person.js")


router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server not found" });
    }
})



router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
             const response = await Person.find({work: workType});
            console.log('response  fetched');
             res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: "Invalid work" });   
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "server failed" });
    }
})

router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
              new: true,
              runValidators: true,
        })

        
        
        console.log("data updated");
        res.status(200).json(response);
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Server failed"});
    }
})

router.delete('/:id', async (req, res) => {
   try{
     const personId = req.params.id;
     const response = await Person.findByIdAndDelete(personId);

     if (response) {
        console.log('Data deleted');
        res.status(204).send(); // 204 No Content when deletion is successful
    } else {
        res.status(404).json({ error: "Person not found" }); // 404 Not Found if no document was found
    }
   }
   catch(err) {
    console.log(err);
    res.status(500).json({error: "Server failed"});
   }
})


module.exports = router;