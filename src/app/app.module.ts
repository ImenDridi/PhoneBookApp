import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './components/hello/hello.component';
import { BookComponent } from './components/book/book.component';
import { PersonComponent } from './components/person/person.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    BookComponent,
    PersonComponent
  ],
  imports: [
     BrowserModule
    ,FormsModule
    // we need to import the HttpClientModule from @angular/common/http for the http requests to be available
    ,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
