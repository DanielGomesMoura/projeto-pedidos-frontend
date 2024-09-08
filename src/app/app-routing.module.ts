import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { ClienteListComponent } from './component/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './component/cliente/cliente-create/cliente-create.component';
import { ProdutoListComponent } from './component/produto/produto-list/produto-list.component';
import { ProdutoCreateComponent } from './component/produto/produto-create/produto-create.component';
import { PedidoListComponent } from './component/pedido/pedido-list/pedido-list.component';
import { PedidoCreateComponent } from './component/pedido/pedido-create/pedido-create.component';
import { PagamentoCreateComponent } from './component/pagamento/pagamento-create/pagamento-create.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RankComponent } from './component/rank/rank.component';
import { ContaListComponent } from './component/conta/conta-list/conta-list.component';
import { ContaCreateComponent } from './component/conta/conta-create/conta-create.component';


const routes: Routes = [
   {path: 'rank', component: RankComponent},
   {path: 'login', component: LoginComponent},
   {
    path: '', component: NavComponent, canActivate: [AuthGuard], children:[
      {path: 'home' ,               component: HomeComponent }, 
      
      {path: 'clientes',            component:  ClienteListComponent},
      {path: 'clientes/create',     component: ClienteCreateComponent},
      {path: 'clientes/update/:id', component: ClienteCreateComponent},

      {path: 'produtos',            component:  ProdutoListComponent},
      {path: 'produtos/create',     component: ProdutoCreateComponent},
      {path: 'produtos/update/:id', component: ProdutoCreateComponent},

      {path: 'pedidos',            component:  PedidoListComponent},
      {path: 'pedidos/create',     component:  PedidoCreateComponent},
      {path: 'pedidos/update/:id', component:  PedidoCreateComponent},

      {path: 'pagamentos/:id',     component:  PagamentoCreateComponent},

      {path: 'contas',             component:  ContaListComponent},
      {path: 'contas/create',      component:  ContaCreateComponent},
      {path: 'contas/update/:id',  component:  ContaCreateComponent},
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
