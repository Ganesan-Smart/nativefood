import { Component, OnInit,Inject } from '@angular/core';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  public providerDetails={"mobile_number":"","password":""};
  providerDetails1={"confirmpassword":""};
  public username:any;
  constructor(public router:Router,public data:ApiService,@Inject(LOCAL_STORAGE) private storage:WebStorageService) { }

  ngOnInit() {
    this.username=this.storage.get('vicky_uname');
  }

// reset password

resetpassword(e){
  e.preventDefault();
  var password=e.target.elements[0].value;
  var confirmpassword=e.target.elements[1].value;
  this.providerDetails={"mobile_number":this.storage.get('vicky_phno'),"password":password};
  var uid=this.storage.get('user_id');
  if(this.providerDetails.password==confirmpassword){
    this.data.changePassword(this.providerDetails,'/users/updatepassword/'.concat(uid)).then((result)=> {
      console.log("success");
      //console.log(this.data.uid);
      //console.log(this.providerDetails.password);
      this.router.navigate(['login']);
    },(err)=>{
  
    }).catch((err)=>{
      console.log("unhandled rejection",err.message);
      });
  }else {
    alert(this.username+' Enter your password correctly');
  }
 }
}
