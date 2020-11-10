import { StringifyOptions } from 'querystring';

// export interface reviewlist{
//     id: string,
//     employeeid: string,
//     assignedemployeeid:string,
//     assignedreviewid:number,
//     pendingreview: string [],
//     feedback:string[]   

// }

export interface reviewlist {
    id:string,
    // employeeid:string,
    pendingreviews:string[],
    feedback: string[]
  

};