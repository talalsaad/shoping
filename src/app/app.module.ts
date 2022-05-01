import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInUpComponent } from './components/sign-in-up/sign-in-up.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import {FirebaseTSApp} from "firebasets/firebasetsApp/firebaseTSApp";
import { AdminComponent } from './components/admin/admin.component'

@NgModule({
  declarations: [
    AppComponent,SignInUpComponent, DashbordComponent, AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule,AngularFireDatabaseModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

constructor(){
  FirebaseTSApp.init(environment.firebaseConfig);
}
 }
