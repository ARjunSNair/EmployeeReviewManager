const express=require('express');
// const { ModuleResolutionKind } = require('typescript');
const Employee =require('../models/employee.schema');
const router =express.Router();
const Reviewlist=require('../models/reviewlist.schema')
    router.get("/employees", (req,res,next)=>{

        Employee.find()
        .then(documents=>{
            res.status(200).json({
                message:'posts fetched succesfully',
                employees: documents
            })  
            // console.log(documents);
        });
    });

    router.post("/employees",(req,res,next)=>{                                               //create employee 
     // const employee=req.body;
        const employee =new Employee({
            employeeid: req.body.employeeid,
            employeename: req.body.employeename,
            department :req.body.department,
            performanceReview: req.body.performanceReview,
    
        });
        // console.log(employee);
        employee.save().then(result=>{
            console.log(result._id);
            const reviewlist=new Reviewlist({
                _id:result._id,
                id:result._id,
                pendingreviews:[],
                feedback:   []
                    });
                    reviewlist.save();
            res.status(201).json({
                message:'post addded succesfully',
                id: result._id
            });     
    })});

    router.put('/employees/:id', (req,res,next)=>{     
        console.log("inside update of ",req.body.performanceReview)                                       // update employees by id
        const employee = new Employee({ 
            _id:req.body.id,
            employeeid: req.body.employeeid,
            employeename: req.body.employeename,
            department :req.body.department,
            performanceReview: req.body.performanceReview
        });
        Employee.updateOne({_id:req.params.id }, employee).then(result=>{
            // console.log(result);
            res.status(200).json({message:"Update successfull"});
        });
    });
    
    
    

    
    // employees/email+eid
    router.get("/employees/email/:eid", (req,res,next)=>{   
        // console.log(req.params.eid)                                          //get employee by email id
     
        Employee.findOne( {employeeid :req.params.eid})
        .then(employee=>{
            if(employee){
                res.status(200).json(employee); 
    
            }
            else{
                res.status(404).json({message:'Post not found'});
            }
     
            // console.log(posts);
        });
       });
    
       router.get("/employees/:id", (req,res,next)=>{                                             //get employee by id
     
        Employee.findById( req.params.id)
        .then(employee=>{
            if(employee){
                res.status(200).json(employee); 
    
            }
            else{
                res.status(404).json({message:'Post not found'});
            }
     
            // console.log(posts);
        });
       });
    
    
    
 

    
    
    
    
    router.delete("/employees/:id",(req,res,next)=>{                                          //delete employee by id
        // console.log(req.params.id);
        Employee.deleteOne({_id: req.params.id}).then(result=>{
            console.log(result);
            Reviewlist.deleteOne({_id: req.params.id});
            res.status(200).json({ message : "Post deleted! "});
        });
        
    });

    //view reviews

    //add review

    //update review

    // delete review

    //assign review



module.exports=router;