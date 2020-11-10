const mongoose =require('mongoose');

const reviewlistSchema =mongoose.Schema({

    // employeeid:string,
    // pendingreviews:string[],
    // feedback: string[]
  

    id: { type : String,unique:true },
    pendingreviews:[],
    feedback: [] 
},
);


module.exports=mongoose.model('Reviewlist', reviewlistSchema);