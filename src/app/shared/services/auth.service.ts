import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        if(user.email=="admin@admin.com")
        { 
          if(this.router.url=="/dashboard"){
            this.router.navigate(['dashboard'])
            
          } 
          else
          this.router.navigate(['admin'])}
        else{
          this.router.navigate(['dashboard'])
            }
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string ,displayName?:string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          if(result.user?.email=='admin@admin.com')
          this.router.navigate(['admin']);
          else
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user,displayName);
        let app:any =document.getElementById('error');
        app.textContent="";
      })
      .catch((error) => {
        let app:any =document.getElementById('error');
        app.textContent="password is wrong or the user dose not exist";
        console.log(error);
        
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string,displayName?:any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user,displayName);
        let app:any =document.getElementById('error');
        app.textContent="done";
        
        
        
      })
      .catch((error) => {
        let app:any =document.getElementById('error');
        app.textContent="email is alrady regster";
        console.log(error);
        
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['Login']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        let app:any =document.getElementById('error');
        app.textContent="password has been sent to ur email";
      })
      .catch((error) => {
        let app:any =document.getElementById('error');
        app.textContent="the email dose not exist";
        console.log(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any,displayName:string) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user,displayName);
        
        
      })
      .catch((error) => {
        console.log(error);
        

      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any,displayName?:string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['Login']);
    });
  }
  
}