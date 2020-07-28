import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ExammenuComponent } from './exammenu/exammenu.component';
import { HomeComponent } from './home/home.component';
import { ExampageComponent } from './exampage/exampage.component';
import { ExamcompleteComponent } from './examcomplete/examcomplete.component';
import { InvpageComponent } from './invpage/invpage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { DialogExampleComponent }  from './dialog-example/dialog-example.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogExample1Component } from './dialog-example1/dialog-example1.component'; 
import { CountdownModule } from 'ngx-countdown';


@NgModule({
  declarations: [
    AppComponent,
    ExammenuComponent,
    HomeComponent,
    ExampageComponent,
    ExamcompleteComponent,
    InvpageComponent,
    HeaderComponent,
    ProfileComponent,
    DialogExample1Component
  ],
  entryComponents: [MatDialogModule,DialogExampleComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    WebcamModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CountdownModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
