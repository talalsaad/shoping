import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getDocs, increment ,updateDoc ,doc , deleteDoc} from "firebase/firestore";


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
private firestore: FirebaseTSFirestore | undefined; 
coldata:any;
user_cart:any[] | undefined;
user_wichlist:any[]|undefined;
user_orderd?:any[];
  AngularFirestore: any;
  AngularFirestore_wichlist:any;
  AngularFirestore_orderd:any;

  usero

  constructor(public authService: AuthService ,private db: AngularFirestore) {

   this.usero= JSON.parse(localStorage.getItem('user')!)

 this.AngularFirestore=db.collection('/users').doc(`/${this.usero.uid}`).collection('/cart');
 this.AngularFirestore_wichlist=db.collection('/users').doc(`/${this.usero.uid}`).collection('/wichlist');
 this.AngularFirestore_orderd=db.collection('/users').doc(`/${this.usero.uid}`).collection('/order');

    /// get the data
    this.firestore= new FirebaseTSFirestore();
    this.db.collection(`items`).valueChanges().subscribe(x=>
      {
        
        
        
        
        this.coldata=x}
        
        );
    //////////////////
    this.db.collection(`users/${this.usero.uid}/cart`).valueChanges().subscribe(user_cart=>
      {
        this.user_cart=user_cart});


    this.db.collection(`users/${this.usero.uid}/wichlist`).valueChanges().subscribe(user_wichlist=>
          {
            
            
            
            this.user_wichlist=user_wichlist});



  
    db.collection(`users/${this.usero.uid}/order`).valueChanges().subscribe(user_orderd => {
      this.user_orderd=user_orderd;
      
      
   
  });

  }

          
         
 //////////////////
    

    
    //end get the data
   

//add items to cart
   addToCart(itemes:any){
    
  
    
  
    
    
if (itemes.name==this.user_cart?.filter(x => x.name == itemes.name)[0]?.name )
  {this.AngularFirestore.doc(`/${itemes.name}`).update({name:itemes.name,price:increment(itemes.price),img:itemes.img,number:increment(1)});
  
   }
   else{
     
     
     
     
     this.AngularFirestore.doc(`/${itemes.name}`).set({name:itemes.name,price:itemes.price,img:itemes.img,number:increment(1)});

   } 
  

   }
//add items to wichlist

      addTowichlist(itemes:any){
       
          
        
if (itemes.name==this.user_wichlist?.filter(x => x.name==itemes.name)[0]?.name)
{this.AngularFirestore_wichlist.doc(`/${itemes.name}`).update({name:itemes.name,price:increment(itemes.price),img:itemes.img,number:increment(itemes.number)});

}
else{
  this.AngularFirestore_wichlist.doc(`/${itemes.name}`).set({name:itemes.name,price:itemes.price,img:itemes.img,number:itemes.number});

} 

this.removeOutCart(itemes)
     
      }

//move item to cart from wichlist
moveTocart(itemes:any){


  if (itemes.name==this.user_cart?.filter(x => x.name==itemes.name)[0]?.name)
{this.AngularFirestore.doc(`/${itemes.name}`).update({name:itemes.name,price:increment(itemes.price),img:itemes.img,number:increment(itemes.number)});

}
else{
  this.AngularFirestore.doc(`/${itemes.name}`).set({name:itemes.name,price:itemes.price,img:itemes.img,number:itemes.number});

} 

this.removeOutwichlist(itemes);
}



//remove items out of cart

removeOutCart(itemes:any){
    this.AngularFirestore.doc(`/${itemes.name}`).delete();
    
  
}




//remove items out of wichlist
removeOutwichlist(itemes:any){
  this.AngularFirestore_wichlist.doc(`/${itemes.name}`).delete();
}







//sub item  of cart
decresItemCart(itemes:any){
  const op =this.coldata.filter((x: any) => x.name==itemes.name)[0];
  
  
  if(itemes.number<=1){return}
  this.AngularFirestore.doc(`/${itemes.name}`).update({name:itemes.name,price:op.price*(itemes.number-1),img:itemes.img,number:increment(-1)});}





//increse item  of cart
increItemCart(itemes:any){


 
  
  let op =this.coldata.filter((x: any) => x.name==itemes.name)[0];


 this.AngularFirestore.doc(`/${itemes.name}`).update({name:itemes.name,price:op.price*(itemes.number+1),img:itemes.img,number:increment(1)});
 }

  ngOnInit(): void {
  }


//buting order
buying(){
     let id_tem= new Date().toUTCString()

     this.user_cart?.forEach(x => {
       this.AngularFirestore_orderd.doc(`/${x.name}`).set({name:x.name,price:x.price,img:x.img,number:x.number});
       this.removeOutCart(x)  
      });




}

/// cansling order
deleto(itemes:any){
  this.AngularFirestore_orderd.doc(`/${itemes.name}`).delete();
    
  
}


}
