const express=require('express');
const { asapScheduler } = require('rxjs');
// const Employee =require('../models/employee.schema');
const Reviewlist=require('../models/reviewlist.schema')
const router =express.Router();






 router.get("/:id", (req,res,next)=>{     

     Reviewlist.findOne( {id: req.params.id})
    .then(reviewlist=>{
        if(reviewlist){
            res.status(200).json(reviewlist); 

        }
        else{
            res.status(404).json({message:'Post not found'});
        }
 
        // console.log(posts);
    });                                      //get employeereviewlist by id


   });


   router.post("/:id",(req,res,next)=>{                                               //create employeereviewlist 


        console.log(req.body.reviewlist)
       const reviewlst =new Reviewlist({
           _id:req.body.id,
            id:req.body.id,
           pendingreviews:req.body.pendingreviews,
           feedback:req.body.feedback

   
       });
    //    reviewlst.pendingreviews.push(req.body.review)
       console.log(reviewlst);
       reviewlst.save().then(result=>{
           console.log(result);
           res.status(201).json({
               message:'review post addded succesfully',
            //    id: result._id
           });     
   })});









    router.put("/:id", (req,res,next)=>{        
        console.log(req.params.id,req.body.id,req.body.pendingreviews,req.body.feedback)   ;                                 // update employeereviewlist by id
        const reviewlista = new Reviewlist({ 
            _id:req.body.id,
            id:req.body.id,
            pendingreviews: req.body.pendingreviews,
            feedback: req.body.feedback,

        });
        console.log(reviewlista.feedback);
   
        Reviewlist.updateOne({  id:req.params.id }, reviewlista).then(result=>{
            console.log(result);
            res.status(200).json({message:"Update successfull"});
        });
    });



    
    module.exports = router;  

    
    
    

    
    
    
 

    
    
    
    
    