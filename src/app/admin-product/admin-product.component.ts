import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  public searchText:any;
  result;item;productDetails;id:any
    providerDetails={
      "name": "",
      "img": "",
      "category": "",
      "breakfast":"" ,
      "lunch": "",
      "dinner": "",
      "rating": "",
      "lon": "",
      "lat": "",
      "zoom": "",
      "provider_address": "",
      "price": "",
      "quantity": "",
      "available": "",
      "provider_id": "",
      "provider_name": "",
      "tax": ""
    };
    constructor(public data:ApiService,public router:Router) {
      this.data.loadData("/items").then((result)=> {
      
        this.data.result=result;
        console.log(result);
        this.sam();
       },() => {
        }).catch((err)=>{
         console.log("unhandled rejection",err.message);
         });
     }
     sam()
     {
      this.result=this.data.result;
      //console.log(this.result);
     }
    save()
    {
      this.data.postDetails(this.providerDetails,'/items').then(() => {
        console.log(this.providerDetails);
        alert("success");
        //location.reload(true);
        //this.router.navigate(['']);
      },() => {
          alert("Please Enter The valid Data or Fill All The Columns");
        }).catch((err)=>{
      
      console.log("unhandled rejection",err.message);
      
      });
    }

  logout(){
    this.router.navigate(['/']);
  }
    clickMethod(ld) {
      if(confirm("Are you sure to delete that product    "+ld.name+"   in the category of "+ld.category )) {
        this.id=ld.id;
        console.log(this.id);
    this.data.deleteDetails('/items/'.concat(this.id)).then(() => {
      alert("success");
      location.reload(true);
    },() => {
      }).catch((err)=>{
      console.log("unhandled rejection",err.message);
      });
      }
    }
  //   image(event)
  //   {
  // this.providerDetails.img=event.target.value;
  
  // }
  
  ngOnInit() {
  }

    }