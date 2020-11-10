import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginstatus;
  userstatus:string;
  constructor() { 
    this.loginstatus = false;
  }
  login(){
    this.loginstatus=true;

  }

  logout(){
    this.loginstatus=false;
    this.userstatus=null;
  }
  getstatus(){
    return this.loginstatus;
  }
  setuserstatus(val:string){
    this.userstatus=val;

  }
  getuserstatus(){
    return this.userstatus;
  }
}
