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
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import { ToastrModule } from 'ngx-toastr';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyRadioModule as MatRadioModule} from "@angular/material/legacy-radio";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

//Componentes do Projeto
import { NavComponent } from './component/nav/nav.component';
import { HeaderComponent } from './component/header/header.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { HomeComponent } from './component/home/home.component';
import { ClienteListComponent } from './component/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './component/cliente/cliente-create/cliente-create.component';
import { ProdutoListComponent } from './component/produto/produto-list/produto-list.component';
import { ProdutoCreateComponent } from './component/produto/produto-create/produto-create.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { NgxMaskModule } from 'ngx-mask';
import { PedidoListComponent } from './component/pedido/pedido-list/pedido-list.component';
import { PedidoCreateComponent } from './component/pedido/pedido-create/pedido-create.component';
import { PagamentoCreateComponent } from './component/pagamento/pagamento-create/pagamento-create.component';
import { LoginComponent } from './component/login/login.component';
import { RankComponent } from './component/rank/rank.component';
import { ContaListComponent } from './component/conta/conta-list/conta-list.component';
import { ContaCreateComponent } from './component/conta/conta-create/conta-create.component';
import { TipoRecebimentoListComponent } from './component/tipo-recebimento-list/tipo-recebimento-list.component';
import { TipoRecebimentoCreateComponent } from './component/tipo-recebimento-create/tipo-recebimento-create.component';
import { MovimentoCaixaListComponent } from './component/movimento-caixa/movimento-caixa-list/movimento-caixa-list.component';

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
    PedidoListComponent,
    PedidoCreateComponent,
    PagamentoCreateComponent,
    LoginComponent,
    RankComponent,
    ContaListComponent,
    ContaCreateComponent,
    TipoRecebimentoListComponent,
    TipoRecebimentoCreateComponent,
    MovimentoCaixaListComponent
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
    AuthInterceptorProvider,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
