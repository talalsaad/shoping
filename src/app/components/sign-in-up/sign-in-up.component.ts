import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.css']
})
export class SignInUpComponent implements OnInit   {
view='loging';
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

}
