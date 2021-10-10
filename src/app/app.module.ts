import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { HomeComponent } from './home/home.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { CreateComponent } from './create/create.component';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
const firebaseConfig = {
  apiKey: "AIzaSyBdZEIbNR8JbAwjKwdQyUMQZU8WCRifs2s",
  authDomain: "scribe-rahul.firebaseapp.com",
  projectId: "scribe-rahul",
  storageBucket: "scribe-rahul.appspot.com",
  messagingSenderId: "365432317940",
  appId: "1:365432317940:web:bd1b8c7e70625dd1673ba1",
  measurementId: "G-CMFV5WG3L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    MyblogsComponent,
    CreateComponent,
    PostComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
