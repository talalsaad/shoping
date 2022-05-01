import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ADDRCONFIG } from 'dns';
import { getAuth, deleteUser } from "firebase/auth";



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private firestore: FirebaseTSFirestore | undefined; 
   
coldata:any;
userlist:any;
usero
  constructor(public authService: AuthService,public router: Router,private db: AngularFirestore) { 
    this.usero= JSON.parse(localStorage.getItem('user')!)
    if(this.usero.email!="admin@admin.com")
      {this.router.navigate(['dashboard'])}
      this.firestore= new FirebaseTSFirestore();
      //get itme list
      this.db.collection(`items`).valueChanges().subscribe(x=>
        {
          this.coldata=x} 
          );
        
      
      //get user list
      this.db.collection('users').valueChanges().subscribe(x=>{
       this.userlist=x})

  }

  ngOnInit(): void {
  }

///price edit
  priceChange(a:any){


    let price = prompt("Please enter new price:");
    if (price == null || price == "") {
      return
    } else {
      this.db.collection('items').doc(`/${a.name}`).update({price:price})
      
    }
  }


//add itme
adding(){
  
  let name:String|null = prompt("Please enter name:");
  let price:any = prompt("Please enter price:");
  let img:String|null = prompt("Please enter imge:");
  let there:String|null = prompt("Please enter true of false avalple for sale:");
  if (price == null ||name==null||name==""||img==null||img==""||there==null||there=="") {
    return
  } else {
    this.db.collection('items').doc(`/${name}`).set({name:name,price:price,img:img,there:there})
    
  }
}

//remove itme 
remove(itemes:any){
  this.db.collection('items').doc(`/${itemes.name}`).delete();
}

//delet user
namechange(list:any){

  let name:String|null = prompt("Please enter name:");
this.db.collection("/users").doc(`/${list.uid}`).update({displayName:name})


}
}