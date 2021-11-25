import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookstoreComponent } from './components/bookstore/bookstore.component';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/bookstore/book/book.component';
import { BookImageComponent } from './components/bookstore/book-image/book-image.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartComponent } from './components/navbar/cart/cart.component';
import { TokenInterceptorService } from './services/token/token-interceptor.service';
import { BookstoreService } from './services/bookstore/bookstore.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './components/navbar/cart/guard/auth.guard';
import { FormatDataService } from './services/formatData/format-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BookstoreComponent,
    LoginComponent,
    BookComponent,
    BookImageComponent,
    NavbarComponent,
    SidebarComponent,
    CartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    BookstoreService,
    AuthService,
    AuthGuard,
    FormatDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
