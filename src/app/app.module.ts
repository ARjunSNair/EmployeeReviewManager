import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';
import { AddemployeeComponent } from './admin/employees/addemployee/addemployee.component';
import { EmployeeReviewlistComponent } from './admin/employees/employee.reviews/employeelist.component';
import { AssignemployeeComponent } from './admin/employees/employee.reviews/assignemployee/assignemployee.component';
import { AddreviewsComponent } from './admin/employees/employee.reviews/addreviews/addreviews.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FeedbackComponent } from './employee/feedback/feedback.component';

import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminComponent,
    EmployeeComponent,
    EmployeeReviewlistComponent,
    AddemployeeComponent,
    AssignemployeeComponent,
    EmployeesComponent,
    AddreviewsComponent,
    FeedbackComponent,

  ],
  imports: [
    // MDBBootstrapModule.forRoot(),
     BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
