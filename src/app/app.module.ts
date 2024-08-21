import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyPipe } from '@angular/common';


// PARA TRABALHAR COM FORMULARIOS NO ANGULAR 12
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
//PARA REALIZAR REQUISIÇÕES HTTP
import {HttpClientModule} from "@angular/common/http";
// IMPORTS PARA OS COMPONENTES DO ANGULAR MATERIAL
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import { ToastrModule } from 'ngx-toastr';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

//Componentes do Projeto
import { NavComponent } from './component/nav/nav.component';
import { HeaderComponent } from './component/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './component/home/home.component';
import { ClienteListComponent } from './component/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './component/cliente/cliente-create/cliente-create.component';
import { ProdutoListComponent } from './component/produto/produto-list/produto-list.component';
import { ProdutoCreateComponent } from './component/produto/produto-create/produto-create.component';
import { NgxMaskModule } from 'ngx-mask';
import { PedidoListComponent } from './component/pedido/pedido-list/pedido-list.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    HomeComponent,
    ClienteListComponent,
    ClienteCreateComponent,
    ProdutoListComponent,
    ProdutoCreateComponent,
    PedidoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()
  ],
  providers: [
    CurrencyPipe,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
